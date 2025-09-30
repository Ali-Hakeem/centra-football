"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
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

  const previewRef = useRef(null);

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
  

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      scale: 2, // biar lebih HD
    });
    const link = document.createElement("a");
    link.download = "head2head.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
            className="border px-3 py-2 rounded text-black"
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
            className="border px-3 py-2 rounded text-black"
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
              onChange={(e) => handleHistoryChange(i, "year", e.target.value)}
              className="w-1/4 p-2 border px-3 py-2 rounded text-black"
            />
            <input
              type="text"
              placeholder="Skor Klub A"
              value={h.scoreA}
              onChange={(e) => handleHistoryChange(i, "scoreA", e.target.value)}
              className="w-1/4 p-2 border px-3 py-2 rounded text-black"
            />
            <input
              type="text"
              placeholder="Skor Klub B"
              value={h.scoreB}
              onChange={(e) => handleHistoryChange(i, "scoreB", e.target.value)}
              className="w-1/4 p-2 border px-3 py-2 rounded text-black"
            />
          </div>
        ))}
      </div>

      {/* Tombol Download */}
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-600 rounded font-bold"
      >
        Download Gambar
      </button>

      {/* Preview */}
      <div
        ref={previewRef}
        className="relative bg-black w-[800px] h-[1000px] overflow-hidden"
      >
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
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
          }}
        />

        {/* Judul */}
        <div> 
          <div className="absolute justify-center z-10 flex flex-col items-center gap-12 top-8 left-5">
            <img src="/assets/h2h.png" className="w-full h-auto object-contain"></img>
          </div>
        </div>

        {/* Logo */}
        {/* <div className="flex relative z-20 justify-between items-center px-25 mt-80">
          {clubA && (
            <div className="w-[300px] h-[300px] flex justify-center items-center mt-[-10px]">
                <img
                  src={clubA}
                  alt="Overlay Left"
                  className="object-contain max-w-full max-h-full"
                  draggable={false}
                />
            </div>
          )}
          <h2 className="mt-[-30px]" style={{ fontSize: "60px" }}>VS</h2>
          {clubB && (
            <div className="w-[300px] h-[300px] flex justify-center items-center mt-[-10px]">
            <img
              src={clubB}
              alt="Overlay Left"
              className="object-contain max-w-full max-h-full"
              draggable={false}
            />
          </div>
          )}
        </div> */}

        {/* History */}
        <div className="relative z-20 top-50 w-[800px] flex flex-col gap-2">
          {history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-white text-[20px] font-bold"
            >
              {/* Club A + Score */}
              <div className="flex items-center gap-10">
                {clubA && (
                  <img
                    src={clubA}
                    alt="Club A"
                    className="w-[100px] h-[130px] object-contain"
                  />
                )}
                <span className="mt-[-55px]" style={{ fontSize: "70px" }}>{h.scoreA}</span>
              </div>

              {/* Tahun di tengah */}
              <span className="mt-[-20px] mx-6 text-[#ff6508] text-[30px] w-[100px] text-center font-bold">{h.year}</span>

              {/* Score + Club B */}
              <div className="flex items-center gap-10">
                <span className="mt-[-55px]" style={{ fontSize: "70px" }}>{h.scoreB}</span>
                {clubB && (
                  <img
                    src={clubB}
                    alt="Club B"
                    className="w-[100px] h-[130px] object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
           {/* Footer */}
          {/* Footer */}
<div className="absolute bottom-12 w-full z-20 flex justify-center">
  <p className="text-white text-[22px] font-bold tracking-wide">
    centrafootball
  </p>
</div>

      </div>
    </main>
  );
}
