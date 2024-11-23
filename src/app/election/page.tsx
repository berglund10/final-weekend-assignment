import { electionService } from "@/features/election/instance";
import { ElectionBoard } from "@/features/election/ui/election-board";

export default async function Page() {
  // getAll elections and map all elections. if done -> show results, otherwise be able to close the election!
  // addNew election
  // patch/ set election as done!
  const elections = await electionService.getAll();

  return (
    <>
      This is the election page!!
      <ElectionBoard elections={elections} />
    </>
  );
}
