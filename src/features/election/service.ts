import { Db } from "@/db/instance";
import { alternativesTable, electionTable } from "./schema";
import { eq } from "drizzle-orm/pg-core/expressions";

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
      // Gör ett API-anrop eller en databasoperation för att lägga till alternativet
      await db.insert(alternativesTable).values({
        election_id,
        name: alternative,
      });
    },

    getById: async (id: number) => {
      const election = await db
        .select()
        .from(electionTable)
        .where(eq(electionTable.id, id))
        .limit(1);

      return election[0];
    },
  };
};
