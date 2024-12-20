import { Db } from "@/db/instance";
import {
  alternativesTable,
  electionTable,
  electionVotesTable,
  publicPreferencesVotesTable,
} from "./schema";
import { and, eq } from "drizzle-orm/pg-core/expressions";
import { publicVotersTable } from "../representative/schema";
import { count } from "drizzle-orm";
import { Election, electionSchema } from "./validation";
import { calculateAgreementRate } from "./logic";

export const createService = (db: Db) => {
  return {
    async getAllElections() {
      return await db.select().from(electionTable);
    },

    async addElection(rawData: Election) {
      const election = electionSchema.parse(rawData);
      const data = await db.insert(electionTable).values(election).returning();
      return data[0];
    },

    async getElectionById(id: number) {
      const election = await db
        .select()
        .from(electionTable)
        .where(eq(electionTable.id, id));

      return election[0];
    },

    async addAlternative(election_id: number, alternative: string) {
      await db.insert(alternativesTable).values({
        election_id,
        name: alternative,
      });
    },
    async addElectionWithAlternatives(
      alternatives: string[],
      rawData: Election,
    ) {
      const election = await this.addElection(rawData);
      await db.transaction(async (tx) => {
        for (const alternative of alternatives) {
          await tx.insert(alternativesTable).values({
            election_id: election.id,
            name: alternative,
          });
        }
      });
    },
    async getAlternativesAndElection(election_id: number) {
      const alternatives = await db
        .select()
        .from(alternativesTable)
        .where(eq(alternativesTable.election_id, election_id));
        const election = await this.getElectionById(election_id);
        return {alternatives, election}
    },

    async getAlternativeNameById(id: number) {
      const alternative = await db
        .select()
        .from(alternativesTable)
        .where(eq(alternativesTable.id, id));

      return alternative[0].name;
    },

    async finishElection(electionId: number) {
      await db
        .update(electionTable)
        .set({ done: true, end_date: new Date() })
        .where(eq(electionTable.id, electionId));
    },

    async getVotesForRepresentativeInElection(
      representativeId: number,
      electionId: number,
    ) {
      const result = await db
        .select({
          voter_id: electionVotesTable.voter_id,
          alternative_id: electionVotesTable.alternative_id,
        })
        .from(electionVotesTable)
        .innerJoin(
          publicVotersTable,
          eq(electionVotesTable.voter_id, publicVotersTable.id),
        )
        .where(
          and(
            eq(publicVotersTable.representative_id, representativeId),
            eq(electionVotesTable.election_id, electionId),
          ),
        );

      return result;
    },

    async getPublicPreferencesForRepresentativeInElection(
      representativeId: number,
      electionId: number,
    ) {
      const result = await db
        .select({
          voter_id: publicPreferencesVotesTable.voter_id,
          alternative_id: publicPreferencesVotesTable.alternative_id,
        })
        .from(publicPreferencesVotesTable)
        .innerJoin(
          publicVotersTable,
          eq(publicPreferencesVotesTable.voter_id, publicVotersTable.id),
        )
        .where(
          and(
            eq(publicVotersTable.representative_id, representativeId),
            eq(publicPreferencesVotesTable.election_id, electionId),
          ),
        );

      return result;
    },

    async registerRepresentativeVotes(
      representative_id: number,
      election_id: number,
      alternative_id: number,
    ) {
      const publicVoters = await db
        .select({ id: publicVotersTable.id })
        .from(publicVotersTable)
        .where(eq(publicVotersTable.representative_id, representative_id));

      const publicVoteIds = publicVoters.map((voter) => voter.id);

      if (publicVoteIds.length > 0) {
        const insertData = publicVoteIds.map((voterId) => ({
          voter_id: voterId,
          election_id: election_id,
          alternative_id: alternative_id,
        }));

        await db.insert(electionVotesTable).values(insertData);
      }
    },

    async getVoteCountAndElection(election_id: number) {
      const alternatives = await db
        .select({
          alternative_id: alternativesTable.id,
          name: alternativesTable.name,
        })
        .from(alternativesTable)
        .where(eq(alternativesTable.election_id, election_id));

      const voteCounts = await db
        .select({
          alternative_id: electionVotesTable.alternative_id,
          vote_count: count(electionVotesTable.id).as("vote_count"),
        })
        .from(electionVotesTable)
        .where(eq(electionVotesTable.election_id, election_id))
        .groupBy(electionVotesTable.alternative_id);

      const voteCount = alternatives.map((alt) => {
        const vote = voteCounts.find(
          (vote) => vote.alternative_id === alt.alternative_id,
        );
        return {
          alternative_id: alt.alternative_id,
          name: alt.name,
          vote_count: vote ? vote.vote_count : 0,
        };
      });
      const election = await this.getElectionById(election_id);
      return {voteCount, election};
    },

    async getAgreementRateForRepresentativeInElection(
      election_id: number,
      representative_id: number,
    ) {
      const votes = await this.getVotesForRepresentativeInElection(
        representative_id,
        election_id,
      );
      const publicPref =
        await this.getPublicPreferencesForRepresentativeInElection(
          representative_id,
          election_id,
        );
      let agreementRate = calculateAgreementRate(votes, publicPref);

      if (isNaN(agreementRate)) {
        agreementRate = 0;
      }

      agreementRate = Math.round(agreementRate);

      return agreementRate;
    },
    async getFirstAlternativeNameForRepresentative(
      election_id: number,
      representative_id: number,
    ) {
      const votes = await this.getVotesForRepresentativeInElection(
        representative_id,
        election_id,
      );

      if (votes.length === 0 || !votes[0].alternative_id) {
        return "no vote";
      }

      const alternativeName = await this.getAlternativeNameById(
        votes[0].alternative_id,
      );
      return alternativeName;
    },
    async getRepresentativeDetailsInElection(
      election_id: number,
      representative_id: number,
    ) {
      const votes = await this.getVotesForRepresentativeInElection(
        representative_id,
        election_id,
      );

      let alternativeName = "no vote";
      if (votes.length > 0 && votes[0].alternative_id) {
        alternativeName = await this.getAlternativeNameById(
          votes[0].alternative_id,
        );
      }

      let agreementRate = 0;
      if (votes.length > 0) {
        const publicPref =
          await this.getPublicPreferencesForRepresentativeInElection(
            representative_id,
            election_id,
          );
        agreementRate = calculateAgreementRate(votes, publicPref);
        if (isNaN(agreementRate)) {
          agreementRate = 0;
        }
        agreementRate = Math.round(agreementRate);
      }

      return {
        votes,
        alternativeName,
        agreementRate,
      };
    },
  };
};
