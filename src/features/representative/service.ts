const db = [
  { id: "1", name: "AB", email: "AB@com" },
  { id: "2", name: "JB", email: "JB@com" },
  { id: "3", name: "VB", email: "VB@com" },
];

export const createService = () => {
  return {
    getAll: async () => {
      return await db;
    },
    add: async (data: any) => {
      console.log(data);
      return await db.push(data);
    },
    vote: async (id: string) => {
      console.log("VOTED FOR :" + id);
      //where id is === id. vote

    }
  };
};
