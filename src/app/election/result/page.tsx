import { electionService } from "@/features/election/instance";
import { ElectionResult } from "@/features/election/ui/election-result";
import { representativeService } from "@/features/representative/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const representatives = await representativeService.getAll();
  const voteCount = await electionService.getVoteCount(Number(id));
  const election = await electionService.getElectionById(Number(id));

  const winner = voteCount.reduce((max, current) =>
    current.vote_count > max.vote_count ? current : max,
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {election.description}
      </h1>

      <p className="text-xl text-center text-gray-600">
        Winner: <strong>{winner.name}</strong> with
        <strong>{winner.vote_count}</strong> votes!
      </p>
      <p className="text-md text-center text-gray-600">
        The election ended &nbsp;
        {election.end_date
          ? new Date(election.end_date).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="space-y-4">
        {representatives.map((rep) => {
          return (
            <div key={rep.id} className="flex flex-col items-center">
              <ElectionResult
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
