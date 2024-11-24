import { Db } from "@/db/instance";
import { alternativesTable, electionTable, electionVotesTable } from "./schema";
import { and, eq, inArray } from "drizzle-orm/pg-core/expressions";
import { publicVotersTable } from "../representative/schema";

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(electionTable);
    },

    addElection: async (rawData: any) => {
      const data = await db.insert(electionTable).values(rawData).returning();
      return data[0];
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
    getAlternativesForRepresentative: async (election_id: number, representative_id: number) => {
      const alternative = await db.select().from(electionVotesTable).where(
          eq(electionVotesTable.election_id, election_id),
      )
      return alternative[0].alternative_id;
    },

    getById: async (id: number) => {
      const election = await db
        .select()
        .from(electionTable)
        .where(eq(electionTable.id, id))
        .limit(1);

      return election[0];
    },
    getVotesForAlternativeInArray: async (election_id: number, voterIds: number[], alternative_id: number) => {
      const votesForAlternative = await db.select()
        .from(electionVotesTable)
        .where(
          and(
            eq(electionVotesTable.election_id, election_id),
            eq(electionVotesTable.alternative_id, alternative_id),
            inArray(electionVotesTable.voter_id, voterIds)
          )
        );

      return votesForAlternative.length;
    },
    getVotesForAlternative: async (election_id: number, alternative_id: number) => {
      const votesForAlternative = await db.select()
      .from(electionVotesTable)
      .where(
        and(
          eq(electionVotesTable.election_id, election_id),
          eq(electionVotesTable.alternative_id, alternative_id)
        )
      )
      return votesForAlternative;
    },
    postVote: async (representativeId: number, electionId: number, alternativeId: number) => {
      await db
        .insert(electionVotesTable)
        .values({
          election_id: electionId,
          alternative_id: alternativeId
        });
    },
    finishElection: async (electionId: number) => {
      await db
      .update(electionTable)
      .set({ done: true })
      .where(eq(electionTable.id, electionId));
    },
    registerRepresentativeVotes: async (representative_id: number, election_id: number, alternative_id: number) => {
      
      const publicVoters = 
      await db
      .select({id: publicVotersTable.id})
      .from(publicVotersTable)
      .where(eq(publicVotersTable.representative_id, representative_id));

      const publicVoteIds = publicVoters.map(voter => voter.id);

      if (publicVoteIds.length > 0) {
        const insertData = publicVoteIds.map(voterId => ({
          voter_id: voterId,
          election_id: election_id,
          alternative_id: alternative_id,
        }));
  
        await db.insert(electionVotesTable).values(insertData);
        return { message: 'Votes successfully registered for representative.' };
      } else {
        return { message: 'No public voters found for this representative.' };
      }
      

    }
  };
};
