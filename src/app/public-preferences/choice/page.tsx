import { electionService } from "@/features/election/instance";
import { OptionDropdown } from "@/features/public-preferences/ui/option-dropdown";
import { OptionElectionBoard } from "@/features/public-preferences/ui/option-election-board";
import { representativeService } from "@/features/representative/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const representative = await representativeService.getById(Number(id));
  const elections = await electionService.getAllElections();

  const publicVoters = await representativeService.getAllPublicVotersById(
    Number(id),
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {representative.name}s voters
      </h1>
      <OptionDropdown publicVoters={publicVoters} />
      <OptionElectionBoard elections={elections} />
    </div>
  );
}
