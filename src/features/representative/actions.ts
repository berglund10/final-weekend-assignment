"use server";

import { revalidatePath } from "next/cache";
import { representativeService } from "./instance";

export const postRepresentativeAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const rawData = {
    name,
    email,
  };

  await representativeService.add(rawData);

  revalidatePath("/representative");
};

export const voteOnRepresentativeAction = async (id: number) => {
  
  await representativeService.vote(id);

  revalidatePath("/representative");
};
