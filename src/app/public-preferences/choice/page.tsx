import { representativeService } from "@/features/representative/instance";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id;

  const publicVoters = await representativeService.getAllPublicVotersById(Number(id));
  console.log(publicVoters);
  //get all public voters where represntant id = 1;



  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {id}
      </h1>
    </div>
  );
}
