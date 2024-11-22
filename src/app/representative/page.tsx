import { representativeService } from "@/features/representative/instance";

export default async function Home() {
    const all = await representativeService.getAll()
    console.log(all);
    //Call service getAll
    //Call service.add (post)

    return (
      <>
      This is the representative page
      </>
    );
  }
  