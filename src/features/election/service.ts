import { Db } from "@/db/instance";
import { alternativesTable, electionTable, votesTable } from "./schema";
import { and, eq, inArray } from "drizzle-orm/pg-core/expressions";

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(electionTable);
    },

    addElection: async (rawData: any) => {
      //const representative = representativeSchema.parse(rawData);
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
      const alternative = await db.select().from(votesTable).where(
        and(
          eq(votesTable.election_id, election_id),
          eq(votesTable.representative_id, representative_id)
        )
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
    getVotesForAlternative: async (election_id: number, voterIds: number[], alternative_id: number) => {
      const votesForAlternative = await db.select()
        .from(votesTable)
        .where(
          and(
            eq(votesTable.election_id, election_id),
            eq(votesTable.alternative_id, alternative_id),
            inArray(votesTable.voter_id, voterIds)
          )
        );

      return votesForAlternative.length;
    },
    postVote: async (representativeId: number, electionId: number, alternativeId: number) => {
      await db
        .insert(votesTable)
        .values({
          representative_id: representativeId,
          election_id: electionId,
          alternative_id: alternativeId
        });
    }
  };
};
