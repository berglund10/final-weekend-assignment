import { electionService } from "../instance";

export async function VoteBoard({ id }: { id: string }) {
  const election = await electionService.getById(id);
  console.log(election);

  return (
    <>
    hej
    </>
  );
}
