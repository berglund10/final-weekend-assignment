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
    <>
      {elections.map((election) => {
        return (
          <div
            key={election.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ marginRight: "10px" }}>{election.description}</p>
            {election.done ? (
              <Link href={`/election/result?id=${election.id}`}>
                Show Result
              </Link>
            ) : (
              <Link href={`/election/vote?id=${election.id}`}>Vote</Link>
            )}
          </div>
        );
      })}
      <form action={postElectionAction}>
        <input
          type="text"
          name="description"
          placeholder="Type of election"
          className="input input-bordered w-full max-w-xs"
        />

        {alternatives.map((alternative, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="alternative"
              value={alternative}
              placeholder="Type of election alternative"
              onChange={(e) => handleAlternativeChange(index, e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addAlternativeField}
          className="btn btn-ghost"
        >
          Add Alternative
        </button>

        <button type="submit" className="btn btn-ghost">
          Send
        </button>
      </form>
    </>
  );
}
