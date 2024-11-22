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
      // Hitta indexet för objektet som har det givna id
      const index = db.findIndex((election) => election.id === id);

      if (index !== -1) {
        // Uppdatera objektet och sätt done till true
        db[index].done = true;
        return db[index]; // Returnera det uppdaterade objektet
      } else {
        return null; // Om inget objekt med det id hittades, returnera null
      }
    },
  };
};
