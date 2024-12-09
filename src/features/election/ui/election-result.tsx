import { electionService } from "@/features";
import React from "react";

type Props = {
  representative: { id: number; name: string; email: string };
  election_id: number;
};

export async function ElectionResult({ representative, election_id }: Props) {

    const votes = await electionService.getVotesForRepresentativeInElection(representative.id, election_id);

    const alternativeName =  await electionService.getFirstAlternativeNameForRepresentative(election_id, representative.id);

    const agreementRate = await electionService.getAgreementRateForRepresentativeInElection(election_id, representative.id)

  return (
    <p>
      {representative.name} voted for {alternativeName} with {votes.length}{" "}
      votes and had an agreement rate of {agreementRate} %
    </p>
  );
}
