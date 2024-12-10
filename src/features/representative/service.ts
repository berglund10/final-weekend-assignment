import { Db } from "@/db/instance";
import { publicVotersTable, representativeTable } from "./schema";
import { Representative, representativeSchema } from "./validation";
import { eq } from "drizzle-orm";

export const createService = function (db: Db) {
  return {
    async getAll() {
      return await db.select().from(representativeTable);
    },

    async getById(representativeId: number) {
      const representative = await db
        .select()
        .from(representativeTable)
        .where(eq(representativeTable.id, representativeId));
      return representative[0];
    },

    async add(rawData: Representative) {
      const representative = representativeSchema.parse(rawData);
      await db.insert(representativeTable).values(representative);
    },

    async vote(id: number) {
      await db.insert(publicVotersTable).values({
        representative_id: id,
      });
    },

    async getAllPublicVotersAndRepresentativeById(representativeId: number) {
      const publicVoters = await db
        .select()
        .from(publicVotersTable)
        .where(eq(publicVotersTable.representative_id, representativeId));

      const representative = await this.getById(Number(representativeId));
      return {
        publicVoters,
        representative,
      };
    },
  };
};
