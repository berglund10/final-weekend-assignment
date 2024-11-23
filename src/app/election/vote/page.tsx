"use client";

import { VoteBoard } from "@/features/election/ui/vote-board";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  return (
    <div>
      <h1>Vote for the current election or close it: {id}</h1>
      <VoteBoard id={id} />
    </div>
  );
}
