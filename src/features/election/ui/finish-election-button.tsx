"use client";

import React from "react";

type Props = {
  electionId: number;
  finishAction: (electionId: number) => void;
};

export function FinishElectionButton({ electionId, finishAction }: Props) {
  return (
    <>
    <button onClick={() => finishAction(electionId)}>
        Finish election {electionId}
    </button>
    <br/>
    </>
  );
}
