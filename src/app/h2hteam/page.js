"use client";

import { useState, useEffect } from "react";
import overlayOptions from "@/data/overlayOptions";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function Head2Head() {
    const [baseImage, setBaseImage] = usePersistedState("h2ht_baseImage", null);
    const [clubA, setClubA] = usePersistedState("h2ht_clubA", null);
    const [clubB, setClubB] = usePersistedState("h2ht_clubB", null);
    const [history, setHistory] = usePersistedState("h2ht_history", [
      { year: "", scoreA: "", scoreB: "" },
      { year: "", scoreA: "", scoreB: "" },
      { year: "", scoreA: "", scoreB: "" },
      { year: "", scoreA: "", scoreB: "" },
      { year: "", scoreA: "", scoreB: "" },
    ]);
    

  const handleBaseUpload = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setBaseImage(url);
    }
  };

  const handleHistoryChange = (index, field, value) => {
    const updated = [...history];
    updated[index][field] = value;
    setHistory(updated);
  };

  const handleLogoSelect = (setter, value) => {
    setter(value ? `/assets/${value}` : "");
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-[#ff6508] min-h-screen text-white">
      <h1 className="z-10 text-3xl font-bold">Head 2 Head Editor</h1>

      {/* Select Klub */}
      <div className="flex gap-6">
        <div>
          <p className="mb-1">Club</p>
          {/* Dropdown Logo Klub A */}
            <select
            onChange={(e) => handleLogoSelect(setClubA, e.target.value)}
            className="border px-3 py-2 rounded text-white"
            value={clubA}
            >
            <option value="">-- Pilih Logo Klub A --</option>
            {Object.entries(overlayOptions).map(([liga, teams]) => (
                <optgroup key={liga} label={liga}>
                {teams.map((team) => (
                    <option key={team} value={`${liga}/${team}`}>
                    {team.replace(".png", "")}
                    </option>
                ))}
                </optgroup>
            ))}
            </select>

            {/* Dropdown Logo Klub B */}
            <select
            onChange={(e) => handleLogoSelect(setClubB, e.target.value)}
            className="border px-3 py-2 rounded text-white"
            value={clubB}
            >
            <option value="">-- Pilih Logo Klub B --</option>
            {Object.entries(overlayOptions).map(([liga, teams]) => (
                <optgroup key={liga} label={liga}>
                {teams.map((team) => (
                    <option key={team} value={`${liga}/${team}`}>
                    {team.replace(".png", "")}
                    </option>
                ))}
                </optgroup>
            ))}
            </select>
        </div>
         
        {/* Upload Background */}
        <div className="mb-4 w-full max-w-xl">
            <p className="mb-2 font-semibold">Upload Gambar Background Rasio 4:5</p>
            <input
            type="file"
            accept="image/*"
            onChange={handleBaseUpload}
            className="w-full border px-3 py-2 rounded text-white"
            style={{ color: "#000000" }}
            />
        </div>
      </div>

      {/* Input History Pertemuan */}
      <div className="w-full max-w-xl">
        <p className="mb-2 font-semibold">5 Pertemuan Terakhir</p>
        {history.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Tahun"
              value={h.year}
              onChange={(e) =>
                handleHistoryChange(i, "year", e.target.value)
              }
              className="w-1/4 p-2 border px-3 py-2 rounded text-white"
            />
            <input
              type="text"
              placeholder="Skor Klub A"
              value={h.scoreA}
              onChange={(e) =>
                handleHistoryChange(i, "scoreA", e.target.value)
              }
              className="w-1/4 p-2 border px-3 py-2 rounded text-white"
            />
            <input
              type="text"
              placeholder="Skor Klub B"
              value={h.scoreB}
              onChange={(e) =>
                handleHistoryChange(i, "scoreB", e.target.value)
              }
              className="w-1/4 p-2 border px-3 py-2 rounded text-white"
            />
          </div>
        ))}
      </div>

      {/* Preview */}
        <div className="relative bg-gradient-to-r from-red-700 to-purple-800 w-[800px] h-[1000px] rounded-lg overflow-hidden">
        {/* Background */}
        {baseImage && (
            <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover z-0"
            />
        )}

        {/* Overlay hitam transparan */}
        <div
            className="absolute inset-0 z-10"
            style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
        />

        {/* Judul */}
        <div className="z-20 bg-[#ff6508]">
            <h2 className="relative z-20 font-bold text-center mt-6" style={{ fontSize: "120px"}}>
                HEAD <span className="text-[#ff6508]">2</span> HEAD TIM
            </h2>
        </div>

        {/* Logo */}
        <div className="flex relative z-20 justify-between items-center px-20 mt-20">
            {clubA && (
            <img
                src={clubA}
                alt="Club A"
                className="w-[150px] h-[150px] object-contain"
            />
            )}
            {clubB && (
            <img
                src={clubB}
                alt="Club B"
                className="w-[150px] h-[150px] object-contain"
            />
            )}
        </div>

        {/* History */}
        <div className="relative z-20 mt-12 px-12 flex flex-col gap-3">
            {history.map((h, i) => (
            <div
                key={i}
                className="flex justify-between items-center p-3 rounded text-xl font-bold"
            >
                <span>{h.year}</span>
                <span>
                {h.scoreA} - {h.scoreB}
                </span>
            </div>
            ))}
        </div>
        </div>
    </main>
  );
}
