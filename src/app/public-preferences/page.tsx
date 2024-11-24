import { PreferenceBoard } from "@/features/public-preferences/ui/preference-board";
import { representativeService } from "@/features/representative/instance";

export default async function Page() {
  const representatives = await representativeService.getAll();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center">Representatives</h1>

      <h2 className="text-2xl font-semibold text-center text-gray-600">
      Select your representative to make your choice in an election.
      </h2>

      <PreferenceBoard representative={representatives} />
    </div>
  );
}
