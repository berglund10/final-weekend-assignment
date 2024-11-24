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

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(electionTable);
    },

    addElection: async (rawData: any) => {
      const data = await db.insert(electionTable).values(rawData).returning();
      return data[0];
    },
    getElectionNameById: async (id: number) => {
      const election = await db
        .select()
        .from(electionTable)
        .where(eq(electionTable.id, id));

      return election[0].description;
    },
    addAlternative: async (election_id: number, alternative: string) => {
      await db.insert(alternativesTable).values({
        election_id,
        name: alternative,
      });
    },
    getAlternatives: async (election_id: number) => {
      return await db
        .select()
        .from(alternativesTable)
        .where(eq(alternativesTable.election_id, election_id));
    },
    getAlternativeNameById: async (id: number) => {
      const alternative = await db
        .select()
        .from(alternativesTable)
        .where(eq(alternativesTable.id, id));

      return alternative[0].name;
    },

    finishElection: async (electionId: number) => {
      await db
        .update(electionTable)
        .set({ done: true })
        .where(eq(electionTable.id, electionId));
    },
    getVotesForRepresentativeInElection: async (
      representativeId: number,
      electionId: number,
    ) => {
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
    getPublicPreferencesForRepresentativeInElection: async (
      representativeId: number,
      electionId: number,
    ) => {
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
    registerRepresentativeVotes: async (
      representative_id: number,
      election_id: number,
      alternative_id: number,
    ) => {
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
        return { message: "Votes successfully registered for representative." };
      } else {
        return { message: "No public voters found for this representative." };
      }
    },
    getVoteCount: async (election_id: number) => {
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

      const result = alternatives.map((alt) => {
        const vote = voteCounts.find(
          (vote) => vote.alternative_id === alt.alternative_id,
        );
        return {
          alternative_id: alt.alternative_id,
          name: alt.name,
          vote_count: vote ? vote.vote_count : 0,
        };
      });

      return result;
    },
  };
};
