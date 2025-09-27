"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-[#ff6508] text-white">
      <h1 className="text-4xl font-bold mb-6">Menu Editor</h1>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => router.push("/score")}
          className="bg-white text-[#ff6508] font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Update Skor
        </button>

        <button
          onClick={() => router.push("/quotes")}
          className="bg-white text-[#ff6508] font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Quotes Editor
        </button>

        <button
          onClick={() => router.push("/info")}
          className="bg-white text-[#ff6508] font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Info Editor
        </button>
      </div>
    </main>
  );
}
