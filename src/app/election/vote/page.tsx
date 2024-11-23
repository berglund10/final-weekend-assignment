import { electionService } from "@/features/election/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;
  const alt = await electionService.getAlternatives(Number(id));
  console.log(alt);
  return (
  <>
  Election {id}
  Alternatives
  {alt.map((alt) => {
    return <p key={alt.alternative_id}>{alt.name}</p>
  })}
  </>)
}
