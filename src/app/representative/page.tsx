import { postRepresentativeAction } from "@/features/representative/actions";
import { representativeService } from "@/features/representative/instance";
import { VoteBoard } from "@/features/representative/ui/vote-board";

export default async function Page() {
  //await representativeService.add();

  const representatives = await representativeService.getAll();
  //Call service getAll
  //Call service.add (post)

  return (
    <>
      This is the representative page{" "}
      <VoteBoard representative={representatives}/>

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
