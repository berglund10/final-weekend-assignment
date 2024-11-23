import { Db } from "@/db/instance";
import { electionTable } from "./schema";
import { eq } from "drizzle-orm/pg-core/expressions";

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(electionTable);
    },

    add: async (rawData: any) => {
      //const representative = representativeSchema.parse(rawData);
      await db.insert(electionTable).values(rawData);
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
