import { representativeService } from "../instance";
import { RepresentativeForm } from "./representative-form";
import { VoteBoard } from "./vote-board";

export async function RepresentativePage() {
  const representatives = await representativeService.getAll();
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">Representatives</h1>

        <h2 className="text-2xl font-semibold text-center text-gray-600">
          Click on a representative to cast your public vote
        </h2>

        <VoteBoard representative={representatives} />
        <div className="w-full max-w-xs mt-8">
          <RepresentativeForm />
        </div>
      </div>
    </>
  );
}
