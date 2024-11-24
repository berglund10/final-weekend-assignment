import { electionService } from "@/features/election/instance";
import { ElectionBoard } from "@/features/election/ui/election-board";

export default async function Page() {
  const elections = await electionService.getAll();

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
