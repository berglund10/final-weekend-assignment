import { representativeService } from "@/features/representative";
import { Result } from "./result";
import { ResultHeader } from "./result-header";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function ResultPage({ searchParams }: Props) {
  const id = (await searchParams).id;

  const representatives = await representativeService.getAll();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <ResultHeader id={id} />
      <div className="space-y-4">
        {representatives.map((rep) => {
          return (
            <div key={rep.id} className="flex flex-col items-center">
              <Result
                key={rep.id}
                representative={rep}
                election_id={Number(id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
