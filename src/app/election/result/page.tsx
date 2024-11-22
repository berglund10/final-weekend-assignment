"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id')

  return (
    <div>
      <h1>Selected Election ID: {id}</h1>
    </div>
  );
}