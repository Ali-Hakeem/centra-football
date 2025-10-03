"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import overlayKompetisi from "@/data/overlayKompetisi";
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
  const [baseImage, setBaseImage] = usePersistedState("derby_baseImage", null);
  const [kategori, setKategori] = usePersistedState("derby_kategori", "");
  const [clubA, setClubA] = usePersistedState("h2hp_clubA", null);
  const [clubB, setClubB] = usePersistedState("h2hp_clubB", null);
  const [history, setHistory] = usePersistedState("h2hp_history", [
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

  const handlePlayerA = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setplayerA(url);
    }
  };

  const handlePlayerB = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setplayerB(url);
    }
  };

  const handleLogoSelectClub = (setter, value) => {
    setter(value ? `/assets/${value}` : "");
  };

  const [kompetisiImage, setKompetisiImage] = useState(null);

const handleLogoSelect = (value) => {
  setKompetisiImage(value ? `/assets/kompetisi/${value}` : "");
};

  const handleHistoryChange = (index, field, value) => {
    const updated = [...history];
    updated[index][field] = value;
    setHistory(updated);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      scale: 2, // biar lebih HD
    });
    const link = document.createElement("a");
    link.download = "matchday.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-[#ff6508] min-h-screen text-white">
      <h1 className="z-10 text-3xl font-bold">Head 2 Head Editor</h1>

      {/* Upload Background */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar Background 1080px X 750px</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleBaseUpload}
          className="border rounded px-3 py-2 w-full"
          style={{ color: "#000000" }}
        />
      </div>

      {/* Input Kategori */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2">Kategori (Top Save/Pass/Skor)</p>
        <input
          type="text"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          style={{ color: "#000000" }}
        />
      </div>

      {/* Select Klub */}
      <div>
        <p className="mb-1">Club</p>
          {/* Dropdown Logo Klub A */}
          <select
            onChange={(e) => handleLogoSelectClub(setClubA, e.target.value)}
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
            onChange={(e) => handleLogoSelectClub(setClubB, e.target.value)}
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

      <div>
          <p className="mb-1">Kompetisi</p>
          {/* Dropdown Logo Klub A */}
          <select
            onChange={(e) => handleLogoSelect(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Pilih Kompetisi --</option>
            {Object.entries(overlayKompetisi).map(([liga, logos]) => (
              <optgroup key={liga} label={liga}>
                {logos.map((logo) => (
                  <option key={logo} value={`${liga}/${logo}`}>
                    {logo.replace(".png", "")}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>


      {/* Input History Pertemuan */}
      <div className="w-full max-w-xl">
        <p className="mb-2 font-semibold">5 Kategpri Terakhir</p>
        {history.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="kategori"
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
        <img
          src="/assets/std2.jpg"
          alt="Base"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Background input */}
        <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-[1080px] h-[750px] object-cover z-5"
          />

        {/* Background */}
        <img
          src="/assets/std22.png"
          alt="Base"
          className="absolute inset-0 w-full h-full object-cover z-40"
        />

        {/* Overlay hitam transparan */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
          }}
        />

        <div className="relative left-23 z-50 top-[455px] w-[620px] h-34 flex flex-col gap-2 bg-white"> 
        </div>

        {/* Judul */}
        <div className="relative left-35 z-50 flex flex-col gap-6 w-full max-w-[850px]">
            <p className="text-[150px] font-bold uppercase mt-[85px]">
              {kategori}
            </p>
        </div>

        {/* History */}
        <div className="relative z-30 top-66 w-[800px] flex flex-col gap-7">
          {history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-white text-[20px] font-bold"
            >
              {/* Club A + Score */}
              <div className="flex items-center gap-10 mr-10">

                <span className="mt-[-20px]" style={{ fontSize: "30px" }}>{h.scoreA}</span>
              </div>

              {/* Tahun di tengah */}
              <span className="mt-[-20px] text-[#ff6508] text-[30px] w-[100px] text-center font-bold">{h.year}</span>

              {/* Score + Club B */}
              <div className="flex items-center gap-10 ml-10">
                
              <span className="mt-[-20px]" style={{ fontSize: "30px" }}>{h.scoreB}</span>
              </div>
            </div>
          ))}
        </div>

        {kompetisiImage && (
          <img
            src={kompetisiImage}
            alt="Kompetisi"
            className="absolute top-10 left-165 z-50 w-[120px] h-[120px] object-contain"
          />
        )}

        {/* Logo */}
        <div className="flex relative z-50 px-5 mt-[-210px]">
          {clubA && (
            <div className="w-[120px] h-[120px] ml-20 flex justify-center items-center mt-[-10px]">
                <img
                  src={clubA}
                  alt="Overlay Left"
                  className="object-contain max-w-full max-h-full"
                  draggable={false}
                />
            </div>
          )}
          <h2 className="ml-5 mt-[10px]" style={{ color: "#000", fontSize: "60px" }}>VS</h2>
          {clubB && (
            <div className="w-[120px] h-[120px] flex justify-center items-center ml-[20px]  mt-[-10px]">
            <img
              src={clubB}
              alt="Overlay Left"
              className="object-contain max-w-full max-h-full"
              draggable={false}
            />
          </div>
          )}
        </div>

        
          {/* Footer */}
<div className="absolute bottom-12 w-full z-50 flex justify-center">
  <p className="text-white text-[22px] font-bold tracking-wide">
    centrafootball
  </p>
</div>

      </div>
    </main>
  );
}
