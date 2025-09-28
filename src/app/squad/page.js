"use client";

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

// ✅ Hook simpan ke localStorage
function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(defaultValue);
  
    useEffect(() => {
      const saved = localStorage.getItem(key);
      if (saved) {
        setState(JSON.parse(saved));
      }
    }, [key]);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState];
  }
  

export default function SquadPage() {
  const [baseImage, setBaseImage] = usePersistedState("baseImage", null);
  const [title, setTitle] = usePersistedState("title", "Indonesia Squad");
  const [subtitle, setSubtitle] = usePersistedState(
    "subtitle",
    "FIFA World Cup 2026 - Asia Qualifiers Round 4"
  );

  // ✅ players hanya satu array, looping input
  const [players, setPlayers] = usePersistedState("players", []);

  const handleBaseUpload = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    setPlayers([...players, { nama: "", klub: "", posisi: "Goalkeeper" }]);
  };

  const removePlayer = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
  };

  const handleDownload = async () => {
    const element = document.getElementById("squad-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "squad.png";
    link.click();
  };

  // kelompokkan pemain berdasarkan posisi
  const groupedPlayers = {
    Goalkeeper: players.filter((p) => p.posisi === "Goalkeeper"),
    Defender: players.filter((p) => p.posisi === "Defender"),
    Midfielder: players.filter((p) => p.posisi === "Midfielder"),
    Forward: players.filter((p) => p.posisi === "Forward"),
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-[#ff6508] text-white">
      <h1 className="text-3xl font-bold mb-6">Squad Editor</h1>

      {/* Upload Background */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Background Resolusi 3:4</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleBaseUpload}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Input Title */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2">Title</p>
        <input
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Input Subtitle */}
      <div className="mb-6 w-full max-w-xl">
        <p className="mb-2">Subtitle</p>
        <input
          type="text"
          value={subtitle || ""}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Input Players */}
<div className="mb-6 w-full max-w-xl">
  <p className="mb-2">Pemain</p>
  {(players.length > 0 ? players : [{ nama: "", klub: "", posisi: "Goalkeeper" }]).map((player, index) => (
    <div key={index} className="flex flex-col gap-2 mb-4 border-b pb-4">
      <input
        type="text"
        placeholder="Nama Pemain"
        value={player.nama || ""}
        onChange={(e) => handlePlayerChange(index, "nama", e.target.value)}
        className="border rounded px-3 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Klub"
        value={player.klub || ""}
        onChange={(e) => handlePlayerChange(index, "klub", e.target.value)}
        className="border rounded px-3 py-2 text-black"
      />
      <select
        value={player.posisi || "Goalkeeper"}
        onChange={(e) => handlePlayerChange(index, "posisi", e.target.value)}
        className="border rounded px-3 py-2 text-black"
      >
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Forward">Forward</option>
      </select>
      <button
        onClick={() => removePlayer(index)}
        className="bg-red-600 text-white px-3 py-1 rounded mt-1 self-start"
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
        className="font-bold px-6 py-2 rounded bg-white text-black"
      >
        Download Squad
      </button>

      {/* Preview */}
      {baseImage && (
        <div
          id="squad-preview"
          className="relative mt-8 w-[1080px] h-[1350px] flex flex-col items-start p-10 overflow-hidden"
          style={{ backgroundColor: "#000" }}
        >
          {/* Background */}
          <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} />
          <div className="absolute justify-center items-center gap-12 top-0 right-10">
                <img src="/assets/cf.png" className="w-[120px] h-[120px] object-contain"></img>
          </div>

          {/* Text */}
          <div className="relative top-0 mt-[-65px] z-10 w-full">
            <h1 className="text-[100px] font-bold mb-[-25px]">{title}</h1>
            <h2 className="text-[45px] mb-4">{subtitle}</h2>

            {Object.entries(groupedPlayers).map(([posisi, list]) =>
              list.length > 0 ? (
                <div key={posisi} className="mb-4">
                  <p className="text-[28px] font-bold text-[#ff6508]">
                    {posisi}
                  </p>
                  <ul className="space-y-1">
                    {list.map((p, i) => (
                      <li key={i} className="text-[27px] mb-[-8px]">
                        <span className="font-bold">{p.nama}</span>{" "}
                        <span style={{ color: "#d1d5db" }}>({p.klub})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </main>
  );
}
