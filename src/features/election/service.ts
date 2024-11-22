import { v4 as uuidv4 } from "uuid";

const db = [
  { id: uuidv4(), type: "Dog vs cat", done: true },
  { id: uuidv4(), type: "Car vs bike", done: true },
  { id: uuidv4(), type: "Jim Carrey vs Adam Sandler", done: false },
];

export const createService = () => {
  return {
    getAll: async () => {
      return await db;
    },

    add: async (data: any) => {
      console.log(data);
      db.push(data);
      return data;
    },

    done: async (id: string) => {
      const index = db.findIndex((election) => election.id === id);

      if (index !== -1) {
        db[index].done = true;
        return db[index];
      } else {
        return null;
      }
    },
  };
};
