export const calculateAgreementRate = (
  representativeVotes: { voter_id: number | null; alternative_id: number }[],
  publicPreferences: { voter_id: number | null; alternative_id: number }[],
) => {
  const validRepresentativeVotes = representativeVotes.filter(
    (vote) => vote.voter_id !== null,
  );

  const matchingVotes = publicPreferences.filter((pref) => {
    const representativeVote = validRepresentativeVotes.find(
      (vote) => vote.voter_id === pref.voter_id,
    );
    return (
      representativeVote &&
      representativeVote.alternative_id === pref.alternative_id
    );
  });

  const matchingCount = matchingVotes.length;

  const totalVotes = validRepresentativeVotes.length;

  const agreementRate = (matchingCount / totalVotes) * 100;

  return agreementRate;
};
