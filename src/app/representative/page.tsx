import { postRepresentativeAction } from "@/features/representative/actions";
import { representativeService } from "@/features/representative/instance";
import { VoteBoard } from "@/features/representative/ui/vote-board";

export default async function Page() {
  const representatives = await representativeService.getAll();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Representatives
      </h1>

      <h2 className="text-2xl font-semibold text-center text-gray-600">
        Click on a representative to cast your public vote
      </h2>

      <VoteBoard representative={representatives} />
      <div className="w-full max-w-xs mt-8">
        <form action={postRepresentativeAction} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name here"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email here"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Add Representative
          </button>
        </form>
      </div>
    </div>
  );
}
