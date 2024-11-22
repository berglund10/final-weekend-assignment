"use server";
import { v4 as uuidv4 } from "uuid";

import { revalidatePath } from "next/cache";
import { electionService } from "./instance";

export const postElectionAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  const rawData = {
    name,
    type,
    id: uuidv4(),
  };

  await electionService.add(rawData);

  revalidatePath("/representative");
};
