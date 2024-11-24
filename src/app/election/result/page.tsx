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
  const electionName = await electionService.getElectionNameById(Number(id));

  const winner = voteCount.reduce((max, current) =>
    current.vote_count > max.vote_count ? current : max
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {electionName}
      </h1>

      <p className="text-xl text-center text-gray-600">
        Winner: <strong>{winner.name}</strong> with <strong>{winner.vote_count}</strong> votes!
      </p>

      <div className="space-y-4">
        {representatives.map((rep) => {
          return (
            <div key={rep.id} className="flex flex-col items-center">
              <Representative
                key={rep.id}
                representative={rep}
                election_id={Number(id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}