import {
  FinishElectionAction,
  selectVoteAction,
} from "@/features/election/actions";
import { electionService } from "@/features/election/instance";
import { AlternativeButton } from "@/features/election/ui/alternative-button";
import { FinishElectionButton } from "@/features/election/ui/finish-election-button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;
  const alternatives = await electionService.getAlternatives(Number(id));
  const electionName = await electionService.getElectionNameById(Number(id));

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {electionName}
      </h1>

      <div className="flex flex-col items-center space-y-4">
        {alternatives.map((alternative) => {
          return (
            <AlternativeButton
              key={alternative.id}
              alternativeId={alternative.id}
              alternativeName={alternative.name}
              selectVoteAction={selectVoteAction}
              electionId={Number(id)}
            />
          );
        })}
      </div>

      <div className="mt-8">
        <FinishElectionButton
          electionId={Number(id)}
          finishAction={FinishElectionAction}
        />
      </div>
    </div>
  );
}
