import { Db } from "@/db/instance";
import { publicVotersTable, representativeTable } from "./schema";
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
    vote: async (id: number) => {
      await db.insert(publicVotersTable).values({
        representative_id: id
      });
      console.log("VOTED!");
    },
  };
};
