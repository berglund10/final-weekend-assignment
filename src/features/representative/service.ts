import { Db } from "@/db/instance";
import { representativeTable } from "./schema";

export const createService = (db: Db) => {
  return {
    getAll: async () => {
      return await db.select().from(representativeTable);
    },
    add: async (data: any) => {
      console.log(data);
      return await db.push(data);
    },
    vote: async (id: string) => {
      console.log("VOTED FOR :" + id);
      //where id is === id. vote
    },
  };
};
