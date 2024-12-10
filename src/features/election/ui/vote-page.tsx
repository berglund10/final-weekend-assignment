import { FinishElectionAction, selectVoteAction } from "../actions";
import { electionService } from "../instance";
import { AlternativeButton } from "./alternative-button";
import { FinishElectionButton } from "./finish-election-button";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function VotePage({ searchParams }: Props) {
  const id = (await searchParams).id;
  const {alternatives, election } = await electionService.getAlternativesAndElection(Number(id));

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {election.description}
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
