"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">Welcome!</h1>
      <p className="text-2xl mb-8">
        View representatives and ongoing elections – choose and vote!
      </p>

      <div className="flex space-x-4">
        <Link href="/representative">
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
            See Representatives
          </button>
        </Link>
        <Link href="/election">
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
            See Elections
          </button>
        </Link>
      </div>
    </div>
  );
}
