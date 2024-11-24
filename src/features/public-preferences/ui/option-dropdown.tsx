"use client";

export function OptionDropdown({ publicVoters }: { publicVoters: { id: number }[] }) {
  return (
    <div className="w-full max-w-xs">
      <select
        value={""}
        onChange={() => console.log("hej")}
        className="select select-bordered w-full"
      >
        <option value="" disabled>
          Select a voter
        </option>
        {publicVoters.map((voter) => (
          <option key={voter.id} value={voter.id}>
            Voter #{voter.id}
          </option>
        ))}
      </select>
    </div>
  );
}
