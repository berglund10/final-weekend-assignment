const db = [
    {name: "AB",
    email: "AB@com"
    },
    {name: "JB",
        email: "JB@com"
    },
    {name: "VB",
        email: "VB@com"
    }
]

export const createService = () => {
    return {
      getAll: async () => {
        return await db;
      },
      add: async () => {
        return await db.push({name: "JA", email: "JA@com"});
      },
}
}