import { Db } from "@/db/instance";
import { representativeTable } from "./schema";
import { Representative, representativeSchema } from "./validation";

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(representativeTable);
    },
    add: async (rawData: Representative) => {
      const representative = representativeSchema.parse(rawData);

      await db.insert(representativeTable).values(representative);
    },
    vote: async (id: string) => {
      console.log("VOTED FOR :" + id);
      //where id is === id. vote
    },
  };
};
