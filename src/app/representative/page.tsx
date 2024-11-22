import { postRepresentativeAction } from "@/features/representative/actions";
import { representativeService } from "@/features/representative/instance";

export default async function Page() {
  //await representativeService.add();

  const all = await representativeService.getAll();
  console.log(all);
  //Call service getAll
  //Call service.add (post)

  return (
    <>
      This is the representative page{" "}
      {all.map((data) => {
        return <p key={data.email}>{data.name}</p>;
      })}
      <form action={postRepresentativeAction}>
        <input
          type="text"
          name="name"
          placeholder="name here"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="email"
          placeholder="Email here"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-ghost">
          Send
        </button>
      </form>
    </>
  );
}
