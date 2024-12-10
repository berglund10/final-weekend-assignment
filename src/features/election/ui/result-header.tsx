import { electionService } from "../instance";

type Props = {
  id?: string;
};

export async function ResultHeader({ id }: Props) {
  const {voteCount, election} = await electionService.getVoteCountAndElection(Number(id));

  const winner = voteCount.reduce((max, current) =>
    current.vote_count > max.vote_count ? current : max,
  );

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {election.description}
      </h1>

      <p className="text-xl text-center text-gray-600">
        Winner: <strong>{winner.name}</strong> with{" "}
        <strong>{winner.vote_count}</strong> votes!
      </p>
      <p className="text-md text-center text-gray-600">
        The election ended &nbsp;
        {election.end_date
          ? new Date(election.end_date).toLocaleDateString()
          : "N/A"}
      </p>
    </>
  );
}
