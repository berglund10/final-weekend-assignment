import { electionService } from "@/features";
import { representativeService } from "@/features";
import { OptionDropdown } from "./option-dropdown";
import { OptionElectionBoard } from "./option-election-board";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ChoicePage({ searchParams }: Props) {
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
