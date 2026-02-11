"use client";

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import overlayOptions from "@/data/overlayOptions";

// ✅ Hook untuk simpan ke localStorage
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

export default function RekorPage() {
  const [baseImage, setBaseImage] = usePersistedState("rekor_baseImage", null);
  const [liga, setLiga] = usePersistedState("rekor_liga", "");
  const [kategori, setKategori] = usePersistedState("rekor_kategori", "");
  const [season, setSeason] = usePersistedState("rekor_season", "");
  const [players, setPlayers] = usePersistedState("rekor_players", [
    { nama: "", jumlah: "", logo: null },
    { nama: "", jumlah: "", logo: null },
    { nama: "", jumlah: "", logo: null },
    { nama: "", jumlah: "", logo: null },
    { nama: "", jumlah: "", logo: null },
  ]);

  const handleBaseUpload = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setBaseImage(url);
    }
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleLogoSelect = (index, value) => {
    const updated = [...players];
    updated[index].logo = value ? `/assets/${value}` : null;
    setPlayers(updated);
  };

  const handleDownload = async () => {
    const element = document.getElementById("rekor-preview");
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: window.devicePixelRatio, // WAJIB
      width: 1080,
      height: 1350,
      backgroundColor: null,
    });
    
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "rekor.png";
    link.click();
  };

  return (
    <main
      className="flex flex-col items-center justify-start min-h-screen p-4"
      style={{ backgroundColor: "#ff6508", color: "#ffffff" }}
    >
      <h1 className="text-3xl font-bold mb-6">Rekor Editor</h1>

      {/* Upload Background */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar Background Rasio 4:5</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleBaseUpload}
          className="border rounded px-3 py-2 w-full"
          style={{ color: "#000000" }}
        />
      </div>

      {/* Input Liga */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2">Liga</p>
        <input
          type="text"
          value={liga}
          onChange={(e) => setLiga(e.target.value)}
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

      {/* Input Season */}
      <div className="mb-6 w-full max-w-xl">
        <p className="mb-2">Season</p>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          style={{ color: "#000000" }}
        />
      </div>

      {/* Input 5 pemain */}
      <div className="mb-6 w-full max-w-xl">
        <p className="mb-2">5 Pemain</p>
        {players.map((player, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4 border-b pb-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama Pemain"
                value={player.nama}
                onChange={(e) =>
                  handlePlayerChange(index, "nama", e.target.value)
                }
                className="border rounded px-3 py-2 w-1/2"
                style={{ color: "#000000" }}
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={player.jumlah}
                onChange={(e) =>
                  handlePlayerChange(index, "jumlah", e.target.value)
                }
                className="border rounded px-3 py-2 w-1/2"
                style={{ color: "#000000" }}
              />
            </div>
            {/* Dropdown Logo */}
            <select
              onChange={(e) => handleLogoSelect(index, e.target.value)}
              className="border px-3 py-2 rounded text-black"
              value={player.logo ? player.logo.replace("/assets/", "") : ""}
            >
              <option value="">-- Pilih Logo --</option>
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
        ))}
      </div>

      <button
        onClick={handleDownload}
        className="font-bold px-6 py-2 rounded"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        Download Rekor
      </button>

      {/* Preview */}
      {baseImage && (
        <div
        id="rekor-preview"
        className="relative mt-8 flex flex-col items-center p-10  overflow-hidden"
        style={{
          width: "1080px",
          height: "1350px",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${baseImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Overlay hitam transparan */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
          />

          {/* Judul */}
          <div className="relative z-10 text-left mb-5 w-full max-w-[850px]">
            <p className="text-[90px] font-bold uppercase mt-[-35px]">
              {kategori} {liga}
            </p>
            <p className="text-[60px] mt-[-22px] text-[#ff6508]">{season}</p>
          </div>

          {/* Daftar Pemain */}
          <div className="relative z-10 top-160 flex flex-col gap-6 w-full max-w-[850px]">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-[40px] font-bold pb-3 mb-[-40px]"
                style={{ borderBottom: "7px solid #ff6508" }}
              >
                {/* Kiri: Nomor, Logo, Nama */}
                <div className="flex items-center gap-5">
                  <span>{i + 1}.</span>
                  {p.logo && (
                    <img
                      src={p.logo}
                      alt="klub"
                      className="w-[27px] h-[35px] object-contain mb-[-32px]"
                    />
                  )}
                  <span>{p.nama}</span>
                </div>

                {/* Kanan: Angka */}
                <span>{p.jumlah}</span>
              </div>
            ))}

            {/* Footer */}
            <div
              className="flex flex-col items-center top-110 mb-35"
              style={{
                fontSize: "22px",
                marginBottom: "-110px",
                marginTop: "50px",
              }}
            >
              <p>centrafootball</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
