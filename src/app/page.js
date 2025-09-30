"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  const menus = [
    { name: "Update Skor Liga", path: "/score" },
    { name: "Update Skor UCL, UECL UEFL", path: "/scoreucl" },
    { name: "Quotes", path: "/quotes" },
    { name: "Informasi", path: "/info" },
    { name: "Statistik Player", path: "/statistik" },
    { name: "Klasmen", path: "/klasmen" },
    { name: "Daftar Individual Stats (5)", path: "/individual" },
    { name: "Squad", path: "/squad" },
    { name: "Daftar Individual Stats Unlimited", path: "/daftar" },
    { name: "Head to Head Tim", path: "/h2hteam" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#ff6508] text-white">
      {/* Judul */}
      <h1 className="text-5xl font-extrabold mb-5 drop-shadow-lg">
        Menu Editor
      </h1>
      <div className="absolute flex justify-center items-center top-0">
          <img
            src="/assets/cf.png"
            className="w-[120px] h-[120px] object-contain"
            alt="CF Logo"
          />
        </div>

      {/* Container Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {menus.map((menu, i) => (
          <button
            key={i}
            onClick={() => router.push(menu.path)}
            className="bg-white text-[#ff6508] font-bold text-xl py-6 px-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
          >
            {menu.name}
          </button>
        ))}
      </div>
    </main>
  );
}
