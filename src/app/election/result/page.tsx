import { electionService } from "@/features/election/instance";
import { representativeService } from "@/features/representative/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const alternatives = await electionService.getAlternatives(Number(id));

  const votes = await electionService.getVotesForRepresentativeInElection(1, Number(id));

  console.log(votes); // HUR MÅNGA SOM REPRESNTANT 1 RÖSTADE MED OCH VILKET ALTERNATIV HEN VALDE

  const publicPref = await electionService.getPublicPreferencesForRepresentativeInElection(1, Number(1));
  // HUR DOM EGENTLIGEN RÖSTADE

  console.log(publicPref);

  const calculateAgreementRate = (
    representativeVotes: { voter_id: number | null; alternative_id: number }[],
    publicPreferences: { voter_id: number | null; alternative_id: number }[]
  ) => {

    const validRepresentativeVotes = representativeVotes.filter(vote => vote.voter_id !== null);
  
    const matchingVotes = publicPreferences.filter((pref) => {
      const representativeVote = validRepresentativeVotes.find(vote => vote.voter_id === pref.voter_id);
      return representativeVote && representativeVote.alternative_id === pref.alternative_id;
    });
  
    const matchingCount = matchingVotes.length;
    
    const totalVotes = validRepresentativeVotes.length;

    const agreementRate = (matchingCount / totalVotes) * 100;
  
    return agreementRate;
  };

  const rate = calculateAgreementRate(votes, publicPref);

  console.log(rate);


  return (
  <>
  STATS for election id:  {id}
  <br/>
  Total public votes:

  {alternatives.map(async (a) => {
    return <p key={a.id}>{a.name} {(await electionService.getVotesForAlternative(Number(id), a.id)).length}</p>
  })}

{/*   Representative: 1 voted for {await electionService.getAlternativeNameById(representativeOneAlternative)} with {voterIds.length} votes
  <br/>
  Representative 2 voted for {await electionService.getAlternativeNameById(representativeTwoAlternative)} with {voterIds2.length} votes */}

  </>
  );
}
