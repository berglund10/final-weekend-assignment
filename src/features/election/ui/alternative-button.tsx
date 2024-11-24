"use client";

import React from "react";

type Props = {
  alternativeId: number;
  electionId: number;
  alternativeName: string;
  selectVoteAction: (alternativeId: number, electionId: number) => void;
};

export function AlternativeButton({
  alternativeId,
  alternativeName,
  selectVoteAction,
  electionId,
}: Props) {
  return (
    <>
      <button
        className="btn btn-danger w-full max-w-xs"
        onClick={() => selectVoteAction(electionId, alternativeId)}
      >
        {alternativeName}
      </button>
      <br />
    </>
  );
}
