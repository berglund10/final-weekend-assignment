import { postRepresentativeAction } from "../actions";

export function RepresentativeForm() {
  return (
    <>
      <form action={postRepresentativeAction} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name here"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email here"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full text-white text-2xl flex items-center justify-center hover:bg-blue-600"
        >
          +
        </button>
      </form>
    </>
  );
}
