"use client";

import React from "react";

type Props = {
  alternativeId: number;
  electionId: number;
  alternativeName: string;
  selectAction: (alternativeId: number, electionId: number) => void;
};

export function AlternativeButton({ alternativeId, alternativeName, selectAction, electionId }: Props) {
  return (
    <button onClick={() => selectAction(electionId, alternativeId)}>
      Vote for {alternativeName}
    </button>
  );
}
