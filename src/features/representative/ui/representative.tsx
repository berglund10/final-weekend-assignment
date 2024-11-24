import { electionService } from '@/features/election/instance';
import { calculateAgreementRate } from '@/features/election/logic';
import React from 'react';

type Props = {
  representative: { id: number; name: string; email: string };
  election_id: number;
};

const Representative = async ({ representative, election_id }: Props) => {

  const votes = await electionService.getVotesForRepresentativeInElection(
    representative.id,
    election_id
  );
  console.log(votes);

  // Om votes[0]?.alternative_id är undefined, sätt alternativeName till "No vote"
  const alternativeName = votes[0]?.alternative_id
    ? await electionService.getAlternativeNameById(votes[0].alternative_id)
    : 'no vote'; // Här kan du byta till '0' om du vill visa 0 istället för "No vote"

  const publicPref = await electionService.getPublicPreferencesForRepresentativeInElection(
    representative.id,
    election_id
  );

  let agreementRate = calculateAgreementRate(votes, publicPref);

  if (isNaN(agreementRate)) {
    agreementRate = 0;
  }

  agreementRate = Math.round(agreementRate);

  return (
    <p>
      {representative.name} voted for {alternativeName} with {votes.length} votes and an agreement rate of {agreementRate} %
    </p>
  );
};

export default Representative;
