"use client";

import { useState } from "react";
import { voteOnRepresentativeAction } from "@/features/representative/actions";

type Props = {
  representative: {
    id: number;
    name: string;
    email: string;
  }[];
};

export function VoteBoard({ representative }: Props) {
  const [votedRep, setVotedRep] = useState<number | null>(null);

  const handleVoteClick = (repId: number) => {
    voteOnRepresentativeAction(repId);
    setVotedRep(repId);
    setTimeout(() => setVotedRep(null), 2000);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {representative.map((rep) => {
        return (
          <div
            key={rep.email}
            onClick={() => handleVoteClick(rep.id)}
            className="cursor-pointer w-24 h-24 flex items-center justify-center bg-blue-500 text-white rounded-full text-center font-semibold transition-all hover:bg-blue-700 hover:scale-110 relative"
          >
            {rep.name}

            {votedRep === rep.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <p className="text-white text-xl font-bold animate-pulse">
                  +1 Vote!
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
