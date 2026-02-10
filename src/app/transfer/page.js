"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import overlayOptions from "@/data/overlayOptions";
import overlayKompetisi from "@/data/overlayTransfer";

export default function Home() {
  const router = useRouter();

  const [wM, setWm] = useState(null);
  const [baseImage, setBaseImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [overlayImage2, setOverlayImage2] = useState(null);
  const [overlayImage3, setOverlayImage3] = useState(null);
  const [kategori, setKategori] = useState("");
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
      setKategori(parsed.kategori || "");
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
      kategori,
    };
    sessionStorage.setItem("formData", JSON.stringify(data));
    router.push("/previewtransfer");
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
          <p className="mb-2 font-semibold">sratus transfer</p>
          <select
            onChange={(e) => setOverlayImage3(`/assets/transfer/${e.target.value}`)}
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

      {/* Input Kategori */}
      <div className="mb-4 w-full max-w-xl">
          <p className="mb-2">Nama player</p>
          <input
            type="text"
            value={kategori ?? ""}
            onChange={(e) => setKategori(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
          />
        </div>

      <div className="flex gap-4 mb-6">
        <div>
          <p className="mb-2 font-semibold">Tim 1</p>
          <select
            onChange={(e) => setOverlayImage(`/assets/${e.target.value}`)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Pilih Gambar --</option>
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
          <p className="mb-2 font-semibold">Tim 2</p>
            <select
              onChange={(e) => setOverlayImage2(`/assets/${e.target.value}`)}
              className="border px-3 py-2 rounded"
            >
              <option value="">-- Pilih Gambar --</option>
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
      </div>

      {/* Event Input */}

      <button onClick={handleGenerate} className="bg-green-600 text-white px-6 py-2 rounded">
        Generate Preview
      </button>
    </main>
  );
}
