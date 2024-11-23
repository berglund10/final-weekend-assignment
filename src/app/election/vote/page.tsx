import { selectAction } from "@/features/election/actions";
import { electionService } from "@/features/election/instance";
import { AlternativeButton } from "@/features/election/ui/alternative-button";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;
  const alt = await electionService.getAlternatives(Number(id));

  return (
    <>
      <h1>Election {id}</h1>
      <h2>Alternatives</h2>
      <div>
        {alt.map((alternative) => {
          return (
            <AlternativeButton
              key={alternative.id}
              alternativeId={alternative.id}
              alternativeName={alternative.name}
              selectAction={selectAction}
              electionId={Number(id)}
            />
          );
        })}
      </div>
    </>
  );
}
