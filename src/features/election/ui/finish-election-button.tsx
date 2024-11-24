"use client";

import React from "react";

type Props = {
  electionId: number;
  finishAction: (electionId: number) => void;
};

export function FinishElectionButton({ electionId, finishAction }: Props) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => finishAction(electionId)}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all"
      >
        Close Election
      </button>
    </div>
  );
}
