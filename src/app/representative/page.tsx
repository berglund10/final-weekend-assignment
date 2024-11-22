import { representativeService } from "@/features/representative/instance";

export default async function Page() {
    //await representativeService.add();

    const all = await representativeService.getAll()
    console.log(all);
    //Call service getAll
    //Call service.add (post)

    return (
      <>
      This is the representative page {all.map((data) => {
        return <p key={data.email}>{data.name}</p>
      })}
      </>
    );
  }
  