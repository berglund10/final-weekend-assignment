"use client";

import { voteOnRepresentativeAction } from "@/features/representative/actions";

type Props = {
  representative: {
    id: string;
    name: string;
    email: string;
  }[];
};

export function VoteBoard({ representative }: Props) {
  return (
    <>
      This is the representative page{" "}
      {representative.map((rep) => {
        return (
          <p onClick={() => voteOnRepresentativeAction(rep.id)} key={rep.email}>
            {rep.name}
          </p>
        );
      })}
    </>
  );
}
