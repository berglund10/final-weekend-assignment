"use client";
import Link from "next/link";

import {
  postElectionAction,
} from "@/features/election/actions";

type Props = {
  elections: {
    id: string;
    type: string;
    done: boolean;
  }[];
};

export function ElectionBoard({ elections }: Props) {
  // getAll elections and map all elections. if done -> show results, otherwise be able to close the election!
  // addNew election
  // patch/ set election as done!

  return (
    <>
      This is the election page!!
      {elections.map((election) => {
        return (
          <div
            key={election.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ marginRight: "10px" }}>{election.type}</p>
            {election.done ? (
              <Link href={`/election/result?id=${election.id}`}>
                Show Result
              </Link>
            ) : (
              <Link href={`/election/vote?id=${election.id}`}>
                Vote 
              </Link>
            )}
          </div>
        );
      })}
      <form action={postElectionAction}>
        <input
          type="text"
          name="name"
          placeholder="election name here"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="type"
          placeholder="Type of election"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-ghost">
          Send
        </button>
      </form>
    </>
  );
}
