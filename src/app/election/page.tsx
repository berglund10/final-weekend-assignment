import { postElectionAction } from "@/features/election/actions";
import { electionService } from "@/features/election/instance";

export default async function Page() {
    // getAll elections and map all elections. if done -> show results, otherwise be able to close the election!
    // addNew election
    // patch/ set election as done!
    const elections = await electionService.getAll()

    return (
      <>
      This is the election page!!
      {elections.map((election) => {
        return <p key={election.id}> {election.type}</p>
      })}

        <form action={postElectionAction}>
        <input type="text" name="name" placeholder="election name here" className="input input-bordered w-full max-w-xs" />
        <input type="text" name="type" placeholder="Type of election" className="input input-bordered w-full max-w-xs"/>
        <button type="submit" className="btn btn-ghost">Send</button>
        </form>
      </>
    );
  }
  