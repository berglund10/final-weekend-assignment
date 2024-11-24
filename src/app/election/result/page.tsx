import { electionService } from "@/features/election/instance";
import { calculateAgreementRate } from "@/features/election/logic";
import { representativeService } from "@/features/representative/instance";
import Representative from "@/features/representative/ui/representative";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const representatives = await representativeService.getAll();

  const voteCount = await electionService.getVoteCount(Number(id));

  const winner = voteCount.reduce((max, current) =>
    current.vote_count > max.vote_count ? current : max
  );

  return (
  <>
  STATS for election id:  {id}
  {representatives.map((rep) => {
    return <Representative key={rep.id} representative={rep} election_id={Number(id)} />
  })}
  <br/>
  Winner is {winner.name} with {winner.vote_count} votes!
  
  </>
  );
}