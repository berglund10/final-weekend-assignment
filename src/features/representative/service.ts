const db = ["hej"]

export const createService = () => {
    return {
      getAll: async () => {
        return await db[0];
      },
}
}