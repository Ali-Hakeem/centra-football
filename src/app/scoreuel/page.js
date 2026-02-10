"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import overlayUel from "@/data/overlayUel";
import overlayKompetisi from "@/data/overlayKompetisi";

export default function Home() {
  const router = useRouter();

  const [wM, setWm] = useState(null);
  const [baseImage, setBaseImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [overlayImage2, setOverlayImage2] = useState(null);
  const [overlayImage3, setOverlayImage3] = useState(null);
  const [text, setText] = useState("0");
  const [text2, setText2] = useState("0");
  const [leftEvents, setLeftEvents] = useState([{ nama: "", menit: "", tipe: "" }]);
  const [rightEvents, setRightEvents] = useState([{ nama: "", menit: "", tipe: "" }]);

  // load sessionStorage saat reload/back
  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setWm(parsed.wM || null);
      setBaseImage(parsed.baseImage || null);
      setOverlayImage(parsed.overlayImage || null);
      setOverlayImage2(parsed.overlayImage2 || null);
      setOverlayImage3(parsed.overlayImage3 || null);
      setText(parsed.text || "0");
      setText2(parsed.text2 || "0");
      setLeftEvents(parsed.leftEvents || [{ nama: "", menit: "", tipe: "" }]);
      setRightEvents(parsed.rightEvents || [{ nama: "", menit: "", tipe: "" }]);
    }
  }, []);

  const actionOptions = [
    "Goal",
    "Red Card",
  ];

  const handleFile = (e, setter) => {
    if (e.target.files?.[0]) setter(URL.createObjectURL(e.target.files[0]));
  };

  const updateEvent = (side, index, field, value) => {
    const updated = side === "left" ? [...leftEvents] : [...rightEvents];
    updated[index][field] = value;
    side === "left" ? setLeftEvents(updated) : setRightEvents(updated);
  };

  const addEvent = (side) => {
    const newEvent = { nama: "", menit: "", tipe: "" };
    side === "left"
      ? setLeftEvents([...leftEvents, newEvent])
      : setRightEvents([...rightEvents, newEvent]);
  };

  const handleGenerate = () => {
    const data = {
      wM,
      baseImage,
      overlayImage,
      overlayImage2,
      overlayImage3,
      text,
      text2,
      leftEvents,
      rightEvents,
    };
    sessionStorage.setItem("formData", JSON.stringify(data));
    router.push("/previewuel");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Editor Gambar Centra Football</h1>

      {/* Upload Section */}
      <div className="flex gap-4 mb-6">
        <div>
          <p className="mb-2 font-semibold">Upload WM</p>
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, setWm)} />
        </div>
        
        <div>
          <p className="mb-2 font-semibold">Background</p>
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, setBaseImage)} />
        </div>

        <div>
          <p className="mb-2 font-semibold">kopetisi</p>
          <select
            onChange={(e) => setOverlayImage3(`/assets/kompetisi/${e.target.value}`)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Pilih Gambar --</option>
            {Object.entries(overlayKompetisi).map(([liga, teams]) => (
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

      </div>

      <div className="flex gap-4 mb-6">
        <div>
          <p className="mb-2 font-semibold">Tim 1</p>
          <select
            onChange={(e) => setOverlayImage(`/assets/uel/${e.target.value}`)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Pilih Gambar --</option>
            {Object.entries(overlayUel).map(([liga, teams]) => (
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
          <p className="mb-2 font-semibold">Tim 2</p>
            <select
              onChange={(e) => setOverlayImage2(`/assets/uel/${e.target.value}`)}
              className="border px-3 py-2 rounded"
            >
              <option value="">-- Pilih Gambar --</option>
              {Object.entries(overlayUel).map(([liga, teams]) => (
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
      </div>

      {/* Input Skor */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="Angka kiri"
        />
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="Angka kanan"
        />
      </div>

      {/* Event Input */}
      <div className="grid grid-cols-2 gap-8 mb-6 w-full max-w-4xl">
        {/* Left Events */}
        <div>
          <h2 className="font-bold mb-2">Event Kiri</h2>
          {leftEvents.map((ev, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Nama"
                value={ev.nama}
                onChange={(e) => updateEvent("left", idx, "nama", e.target.value)}
                className="border px-2 py-1 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Menit"
                value={ev.menit}
                onChange={(e) => updateEvent("left", idx, "menit", e.target.value)}
                className="border px-2 py-1 rounded w-1/4"
              />

              {/* Dropdown tipe event */}
              <select
                value={ev.tipe}
                onChange={(e) => updateEvent("left", idx, "tipe", e.target.value)}
                className="border px-2 py-1 rounded w-1/3"
              >
                <option value="">Pilih</option>
                <option value="⚽︎">⚽ Goal</option>
                <option value="🟥">🟥 Red Card</option>
                <option value="🟨">🟨 Yellow Card</option>
                <option value="❌">❌ Gagal Penalti</option>
              </select>

              {/* Tombol Hapus */}
              {leftEvents.length > 1 && (
                <button
                  onClick={() => {
                    const updated = [...leftEvents];
                    updated.splice(idx, 1);
                    setLeftEvents(updated);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addEvent("left")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Tambah
          </button>
        </div>

          {/* Right Events */}
          <div>
            <h2 className="font-bold mb-2">Event Kanan</h2>
            {rightEvents.map((ev, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Nama"
                  value={ev.nama}
                  onChange={(e) => updateEvent("right", idx, "nama", e.target.value)}
                  className="border px-2 py-1 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Menit"
                  value={ev.menit}
                  onChange={(e) => updateEvent("right", idx, "menit", e.target.value)}
                  className="border px-2 py-1 rounded w-1/4"
                />
               {/* Dropdown tipe event */}
                <select
                  value={ev.tipe}
                  onChange={(e) => updateEvent("right", idx, "tipe", e.target.value)}
                  className="border px-2 py-1 rounded w-1/3"
                >
                  <option value="">Pilih</option>
                  <option value="⚽︎">⚽ Goal</option>
                  <option value="🟥">🟥 Red Card</option>
                  <option value="🟨">🟨 Yellow Card</option>
                  <option value="❌">❌ Gagal Penalti</option>
                </select>
                {/* Tombol Hapus */}
                {rightEvents.length > 1 && (
                  <button
                    onClick={() => {
                      const updated = [...rightEvents];
                      updated.splice(idx, 1);
                      setRightEvents(updated);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addEvent("right")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              + Tambah
            </button>
          </div>
      </div>

      {/* Tombol Generate */}
      <button onClick={handleGenerate} className="bg-green-600 text-white px-6 py-2 rounded">
        Generate Preview
      </button>
    </main>
  );
}
