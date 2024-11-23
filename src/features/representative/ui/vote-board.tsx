"use client";

import { voteOnRepresentativeAction } from "@/features/representative/actions";

type Props = {
  representative: {
    id: number;
    name: string;
    email: string;
  }[];
};

export function VoteBoard({ representative }: Props) {
  return (
    <>
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
