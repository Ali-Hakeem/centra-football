"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import overlayKompetisi from "@/data/overlayKompetisi";

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
  const [baseImage, setBaseImage] = usePersistedState("h2hp_baseImage", null);
  const [playerA, setplayerA] = usePersistedState("h2hp_playerA", null);
  const [playerB, setplayerB] = usePersistedState("h2hp_playerB", null);
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
    link.download = "head2head.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-[#ff6508] min-h-screen text-white">
      <h1 className="z-10 text-3xl font-bold">Head 2 Head Editor</h1>

      {/* Select Klub */}
      <div className="flex gap-6">

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

        {/* Upload player A */}
        <div className="mb-4 w-full max-w-xl">
          <p className="mb-2 font-semibold">Upload Gambar A Rasio 4:5</p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePlayerA}
            className="w-full border px-3 py-2 rounded text-white"
            style={{ color: "#000000" }}
          />
        </div>

        {/* Upload player B */}
        <div className="mb-4 w-full max-w-xl">
          <p className="mb-2 font-semibold">Upload Gambar A Rasio 4:5</p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePlayerB}
            className="w-full border px-3 py-2 rounded text-white"
            style={{ color: "#000000" }}
          />
        </div>
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
        <p className="mb-2 font-semibold">5 Pertemuan Terakhir</p>
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
        {baseImage && (
          <img
            src="/assets/std.jpg"
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Overlay hitam transparan */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
          }}
        />

        {/* Overlay hitam transparan */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
          }}
        />

        {/* Player A */}
        {playerA && (
          <div className="absolute top-60 left-0 h-[480px] w-[270px] z-10 overflow-hidden">
            <img
              src={playerA}
              alt="Player A"
              className="h-full w-full object-contain"
            />
            {/* Overlay gradient atas */}
            <div
              className="absolute top-0 left-0 w-full h-[120px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            />
            {/* Overlay gradient bawah */}
            <div
              className="absolute bottom-0 left-0 w-full h-[120px]"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            />
          </div>
        )}

        {/* Player B */}
        {playerB && (
          <div className="absolute top-60 right-0 h-[480px] w-[270px] z-10 overflow-hidden">
            <img
              src={playerB}
              alt="Player B"
              className="h-full w-full object-contain"
            />
            {/* Overlay gradient atas */}
            <div
              className="absolute top-0 left-0 w-full h-[120px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            />
            {/* Overlay gradient bawah */}
            <div
              className="absolute bottom-0 left-0 w-full h-[120px]"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            />
          </div>
        )}

        {/* Judul */}
        <div> 
          <div className="absolute justify-center z-30 flex flex-col items-center gap-12 top-8 left-5">
            <img src="/assets/h2hplayer.png" className="w-full h-auto object-contain"></img>
          </div>
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
                
              <span className="mt-[-20px]" style={{ fontSize: "30px" }}>{h.scoreA}</span>
              </div>
            </div>
          ))}
        </div>

        {kompetisiImage && (
          <img
            src={kompetisiImage}
            alt="Kompetisi"
            className="absolute top-143 left-85 z-50 w-[120px] h-[120px] object-contain"
          />
        )}



        <div className="mt-[-82px]">  

        <div className="relative left-85 z-20 top-27 w-[120px] h-10 flex flex-col gap-2 bg-white"> 
        </div>
        <div className="relative left-64 z-25 top-[68px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>
        <div className="relative left-115 z-25 top-[28px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>

        <div className="relative left-85 z-20 top-10 w-[120px] h-10 flex flex-col gap-2 bg-white"> 
        </div>
        <div className="relative left-64 z-25 top-[0px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>
        <div className="relative left-115 z-25 top-[-40px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>

        <div className="relative left-85 z-20 top-[-27px] w-[120px] h-10 flex flex-col gap-2 bg-white"> 
        </div>
        <div className="relative left-64 z-25 top-[-67px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>
        <div className="relative left-115 z-25 top-[-107px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>

        <div className="relative left-85 z-20 top-[-94px] w-[120px] h-10 flex flex-col gap-2 bg-white"> 
        </div>
        <div className="relative left-64 z-25 top-[-134px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>
        <div className="relative left-115 z-25 top-[-174px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>

        <div className="relative left-85 z-20 top-[-160px] w-[120px] h-10 flex flex-col gap-2 bg-white"> 
        </div>
        <div className="relative left-64 z-25 top-[-200px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>
        <div className="relative left-115 z-25 top-[-240px] w-[90px] h-10 flex flex-col gap-2 bg-[#ff6508]">
        </div>

       {/* } <div className="relative left-75 z-20 top-[-210px] w-[200px] h-[200px] flex flex-col gap-2 bg-white"> 
        </div> */}

        </div>

        
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
