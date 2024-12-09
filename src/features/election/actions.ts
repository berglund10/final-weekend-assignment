"use server";

import { revalidatePath } from "next/cache";
import { electionService } from "./instance";
import { redirect } from "next/navigation";

export const postElectionAction = async (formData: FormData) => {
  const description = formData.get("description") as string;

  const alternatives = formData.getAll("alternative") as string[];

    await electionService.addElectionWithAlternatives(alternatives, {
      description,
      done: false,
    });

  revalidatePath("/election");
};

export const selectVoteAction = async (
  election_id: number,
  alternativeId: number,
) => {
  const representant_id = 1;

  await electionService.registerRepresentativeVotes(
    representant_id,
    election_id,
    alternativeId,
  );

  redirect("/election");
};

export const FinishElectionAction = async (election_id: number) => {
  await electionService.finishElection(election_id);

  redirect("/election");
};
