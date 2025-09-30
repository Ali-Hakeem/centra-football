"use client";

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

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

export default function DaftarPage() {
  const [baseImage, setBaseImage] = usePersistedState("daftar_baseImage", null);
  const [liga, setLiga] = usePersistedState("daftar_liga", "");
  const [kategori, setKategori] = usePersistedState("daftar_kategori", "");
  const [season, setSeason] = usePersistedState("daftar_season", "");
  const [players, setPlayers] = usePersistedState("daftar_players", [
    { nama: "", jumlah: "" },
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

  const addPlayer = () => {
    setPlayers([...players, { nama: "", jumlah: "" }]);
  };

  const removePlayer = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
  };

  const handleDownload = async () => {
    const element = document.getElementById("rekor-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
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

      {/* Input Pemain */}
      <div className="mb-6 w-full max-w-xl">
        <p className="mb-2">Pemain</p>
        {players.map((player, index) => (
          <div key={index} className="flex gap-2 mb-4">
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
              type="text"
              placeholder="Jumlah"
              value={player.jumlah}
              onChange={(e) =>
                handlePlayerChange(index, "jumlah", e.target.value)
              }
              className="border rounded px-3 py-2 w-1/2"
              style={{ color: "#000000" }}
            />
            <button
              onClick={() => removePlayer(index)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Hapus
            </button>
          </div>
        ))}
        <button
          onClick={addPlayer}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Tambah Pemain
        </button>
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
          className="relative mt-8 w-[1080px] h-[1350px] flex flex-col items-center p-10 overflow-hidden"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        >

            <div className="absolute justify-center z-10 flex flex-col items-center gap-12 top-8 left-10">
                <img src="/assets/cf.png" className="w-[120px] h-[120px] object-contain"></img>
            </div>

          {/* Background */}
          <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
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
          <div className="relative z-10 top-160 flex flex-col gap-6 w-full max-w-[850px]">
            <p className="text-[70px] font-bold uppercase mt-[-35px]">
              {kategori} {liga}
            </p>
            <p className="text-[50px] mt-[-50px] mb-[30px] text-[#ff6508]">{season}</p>
          </div>

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
                  <span>{p.nama}</span>
                </div>

                {/* Kanan: Angka */}
                <span>{p.jumlah}</span>
              </div>
            ))}
            </div>

          {/* Footer */}
          <div className="relative z-10 mt-190 text-[24px] font-medium">
            <p>centrafootball</p>
          </div>
        </div>
      )}
    </main>
  );
}
