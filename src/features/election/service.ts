const db = [
    {id: 1,
    type: "Dog vs cat",
    done: true
    },
    {id: 2,
    type: "Car vs bike",
    done: true
    },
    {id: 3,
    type: "jim carrey vs adam sandler",
    done: false
    }
]

export const createService = () => {
    return {
      getAll: async () => {
        return await db;
      },
      add: async (data:any) => {
        console.log(data);
        return await db.push(data);
      },
      done: async (data: any) => {
        return await db.push(data);
      }
}
}