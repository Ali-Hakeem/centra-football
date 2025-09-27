"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 text-white bg-[#ff6508]">
      <h1 className="text-4xl font-bold mb-6">Menu Editor</h1>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => router.push("/score")}
          className=" font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Update Skor
        </button>

        <button
          onClick={() => router.push("/quotes")}
          className=" font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Quotes Editor
        </button>

        <button
          onClick={() => router.push("/info")}
          className=" font-bold px-8 py-4 rounded-lg hover:bg-gray-200"
        >
          Info Editor
        </button>

        <button
          onClick={() => router.push("/statistik")}
          className=" font-bold px-8 py-4 rounded-lg "
        >
          Statistik Editor
        </button>

        <button
          onClick={() => router.push("/klasmen")}
          className=" font-bold px-8 py-4 rounded-lg "
        >
          Klasmen
        </button>
      </div>
    </main>
  );
}
