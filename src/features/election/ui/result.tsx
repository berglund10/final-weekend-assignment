import { electionService } from "@/features";
import React from "react";

type Props = {
  representative: { id: number; name: string; email: string };
  election_id: number;
};

export async function Result({ representative, election_id }: Props) {
  const { votes, alternativeName, agreementRate } =
    await electionService.getRepresentativeDetailsInElection(
      election_id,
      representative.id,
    );
    
  return (
    <p>
      {representative.name} voted for {alternativeName} with {votes.length}{" "}
      votes and had an agreement rate of {agreementRate} %
    </p>
  );
}
