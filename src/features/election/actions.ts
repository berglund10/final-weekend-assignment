"use server";

import { revalidatePath } from "next/cache";
import { electionService } from "./instance";

export const postElectionAction = async (formData: FormData) => {
  const description = formData.get("description") as string;

  const alternatives = formData.getAll("alternative") as string[];

  const newElection = await electionService.addElection({ description });

  let index = 0;
  while (index < alternatives.length) {
    const alternative = alternatives[index];

    await electionService.addAlternative(newElection.id, alternative);

    index++;
  }

  revalidatePath("/election");
};

export const selectAction = async (election_id: number, alternativeId: number) => {
  //call votes tabell
  console.log(election_id);
  console.log(alternativeId);
  //const all = await electionService.getAll();
}
