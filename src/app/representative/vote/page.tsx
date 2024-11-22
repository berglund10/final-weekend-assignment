import { representativeService } from "@/features/representative/instance";
import { VoteBoard } from "@/features/representative/ui/vote-board";

export default async function Page() {
  const representatives = await representativeService.getAll();

  return (
    <>
      <VoteBoard representative={representatives} />
    </>
  );
}
