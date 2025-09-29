"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export default function StatistikEditor() {
  const [baseImage, setBaseImage] = useState(null);
  const [name, setName] = useState("");
  const [musim, setMusim] = useState("");
  const [appearances, setAppearances] = useState("");
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");

  const handleFile = (e) => {
    if (e.target.files?.[0]) setBaseImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = async () => {
    const element = document.getElementById("card-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "player-card.png";
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 bg-[#ff6508] text-white">
      <h1 className="text-3xl font-bold mb-6">Player Stats Editor</h1>

      {/* Upload Background */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Background Rasio 3:4</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Input Nama */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Nama Pemain</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full text-black"
          placeholder="Nama Pemain..."
        />
      </div>

      {/* Input Musim */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Season</p>
        <input
          type="text"
          value={musim}
          onChange={(e) => setMusim(e.target.value)}
          className="border rounded px-3 py-2 w-full text-black"
          placeholder="Nama Pemain..."
        />
      </div>

      {/* Input Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-xl">
        <div>
          <p className="mb-1 font-semibold">Penampilan</p>
          <input
            type="number"
            value={appearances}
            onChange={(e) => setAppearances(e.target.value)}
            className="border rounded px-3 py-2 w-full h-32 text-black"
          />
        </div>
        <div>
          <p className="mb-1 font-semibold">Goals</p>
          <input
            type="number"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="border rounded px-3 py-2 w-full h-32 text-black"
          />
        </div>
        <div>
          <p className="mb-1 font-semibold">Assists</p>
          <input
            type="number"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
            className="border rounded px-3 py-2 w-full h-32 text-black"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-[#ffff] text-[#000] font-bold px-6 py-2 rounded hover:bg-[#0000] hover:text-[#fff]"
      >
        Download Card
      </button>

      {/* Preview */}
      {baseImage && (
        <div
          id="card-preview"
          className="relative mt-8 w-[1080px] h-[1350px] overflow-hidden"
        >
          {/* Background */}
          <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay hitam transparan */}
          <div
            className="absolute inset-0 h-[100%]"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,2.5), transparent 50%)",
            }}
          />

          {/* Logo (contoh static, bisa diganti input) */}
          <div className="absolute left-30 transform -translate-x-1/2">
            <img
              src="/assets/cf.png"
              className="w-[140px] h-[140px] object-contain"
            />
          </div>

          {/* Nama Pemain */}
          <div className="absolute top-[750px] left-1/2 transform -translate-x-1/2 text-center">
            <p className="font-bold text-[#fff]" style={{ fontSize: "55px"}}>{name}</p>
            <div>
              <span><p className="px-4 text-[#fff] font-semibold mt-[-10px]" style={{ fontSize: "35px"}}>{musim}</p></span>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-55 left-1/2 transform -translate-x-1/2 flex gap-16 text-center">
            <div>
              <p className="font-bold text-[#ff6508] mb-[-5px]" style={{ fontSize: "240px"}}>{appearances}</p>
              <p className="text-[#fff] font-semibold" style={{ fontSize: "40px"}}>MATCHES</p>
            </div>
            <div>
              <p className="font-bold text-[#ff6508] mb-[-5px]" style={{ fontSize: "240px"}}>{goals}</p>
              <p className="text-[#fff] font-semibold" style={{ fontSize: "40px"}}>GOALS</p>
            </div>
            <div>
              <p className="font-bold text-[#ff6508] mb-[-5px]" style={{ fontSize: "240px"}}>{assists}</p>
              <p className="text-[#fff] font-semibold" style={{ fontSize: "40px"}}>ASSISTS</p>
            </div>
          </div>
          {/* Footer */}
          <div
            className="flex flex-col items-center max-h-[50px]"
            style={{ fontSize: "22px", marginBottom: "-110px", marginTop: "50px" }}
          >
            <p>centrafootball</p>
          </div>
        </div>
      )}
    </main>
  );
}
