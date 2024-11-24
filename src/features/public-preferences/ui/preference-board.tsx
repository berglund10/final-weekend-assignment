"use client";

import { redirect } from "next/navigation";

type Props = {
  representative: {
    id: number;
    name: string;
    email: string;
  }[];
};

export function PreferenceBoard({ representative }: Props) {

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {representative.map((rep) => {
        return (
          <div
            key={rep.email}
            onClick={() => redirect(`/public-preferences/choice?id=${rep.id}`)}
            className="cursor-pointer w-24 h-24 flex items-center justify-center bg-blue-500 text-white rounded-full text-center font-semibold transition-all hover:bg-blue-700 hover:scale-110 relative"
          >
            {rep.name}

          </div>
        );
      })}
    </div>
  );
}
