"use client";
import Link from "next/link";
import { postElectionAction } from "@/features/election/actions";
import { useState } from "react";

type Props = {
  elections: {
    id: number;
    description: string;
    done: boolean;
  }[];
};

export function ElectionBoard({ elections }: Props) {
  const [alternatives, setAlternatives] = useState([""]);

  const handleAlternativeChange = (index: number, value: string) => {
    const updatedAlternatives = [...alternatives];
    updatedAlternatives[index] = value;
    setAlternatives(updatedAlternatives);
  };

  const addAlternativeField = () => {
    setAlternatives([...alternatives, ""]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {elections.map((election) => {
        return (
          <div
            key={election.id}
            className="flex items-center justify-between w-full max-w-lg p-4 border rounded-lg shadow-md bg-white"
          >
            <p className="text-lg font-semibold text-gray-800">{election.description}</p>
            {election.done ? (
              <Link
                href={`/election/result?id=${election.id}`}
                className="btn btn-primary text-white px-6 py-2 rounded"
              >
                Result
              </Link>
            ) : (
              <Link
                href={`/election/vote?id=${election.id}`}
                className="btn btn-secondary text-white px-6 py-2 rounded"
              >
                Vote
              </Link>
            )}
          </div>
        );
      })}

      <form action={postElectionAction} className="space-y-4 w-full max-w-lg">
        <div>
          <input
            type="text"
            name="description"
            placeholder="Type of election"
            className="input input-bordered w-full p-3 rounded-lg"
          />
        </div>

        {alternatives.map((alternative, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="alternative"
              value={alternative}
              placeholder="Type of election alternative"
              onChange={(e) => handleAlternativeChange(index, e.target.value)}
              className="input input-bordered w-full p-3 rounded-lg"
              required
            />
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addAlternativeField}
            className="btn btn-ghost text-gray-600 px-4 py-2 rounded-lg border"
          >
            Add Alternative
          </button>

          <button
            type="submit"
            className="btn btn-primary text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}