import { electionService } from "@/features/election/instance";
import { representativeService } from "@/features/representative/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const representativeOneAlternative = await electionService.getAlternativesForRepresentative(Number(id), 1);

  const publicVotersRep1 = await representativeService.getAllPublicVotersByRepresentative(1);

  const voterIds = publicVotersRep1.map(voter => voter.id);

  const alternatives = await electionService.getAlternatives(Number(id));

  return (
  <>
  For election id:  {id}
  <br/>
  Total public votes:

  {alternatives.map(async (a) => {
    return <p key={a.id}>{a.name} {await electionService.getVotesForAlternative(Number(id), voterIds, a.id)}</p>
  })}

  Representative: 1 voted for alternaive number: {representativeOneAlternative}

  </>
  );
}
