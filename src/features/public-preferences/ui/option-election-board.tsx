"use client";
import Link from "next/link";

type Props = {
  elections: {
    id: number;
    description: string;
    done: boolean;
  }[];
};

export function OptionElectionBoard({ elections }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {elections
        .filter((election) => !election.done)
        .map((election) => (
          <div
            key={election.id}
            className="flex items-center justify-between w-full max-w-lg p-4 border rounded-lg shadow-md bg-white"
          >
            <p className="text-lg font-medium text-gray-700">
              {election.description}
            </p>
            <Link
              href={`/election/vote?id=${election.id}`}
              className="btn btn-secondary text-white px-6 mx-2 py-2 rounded"
            >
              Vote
            </Link>
          </div>
        ))}
    </div>
  );
}
