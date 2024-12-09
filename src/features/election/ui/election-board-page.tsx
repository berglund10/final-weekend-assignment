import { electionService } from "../instance";
import { ElectionBoard } from "./election-board";

export async function ElectionBoardPage() {
  const elections = await electionService.getAllElections();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Elections
      </h1>

      <p className="text-xl text-center text-gray-600">
        View results, participate in ongoing, or create a new election.
      </p>

      <ElectionBoard elections={elections} />
    </div>
  );
}
