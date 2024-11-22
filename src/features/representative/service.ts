const db = [
  { name: "AB", email: "AB@com" },
  { name: "JB", email: "JB@com" },
  { name: "VB", email: "VB@com" },
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
  };
};
