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
    { nama: "", main: "", jumlah: "" },
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
    setPlayers([...players, { nama: "", main:"", jumlah: "" }]);
  };

  const removePlayer = (index) => {
    const updated = players.filter((_, i) => i !== index);
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
    link.download = "klasmen2.png";
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
        <p className="mb-2">Liga</p>
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
              placeholder="main"
              value={player.main}
              onChange={(e) =>
                handlePlayerChange(index, "main", e.target.value)
              }
              className="border rounded px-3 py-2 w-1/2"
              style={{ color: "#000000" }}
            />
            <input
              type="text"
              placeholder="poin"
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
        className="relative mt-8 flex flex-col items-center p-10 overflow-hidden"
        style={{
          width: "1080px",
          height: "1350px",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >

            <div className="absolute justify-center z-10 flex flex-col items-center gap-12 top-8 left-10">
                <img src="/assets/cf.png" className="w-[120px] h-[120px] object-contain"></img>
            </div>

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
          <div className="relative z-10 top-160 flex flex-col gap-6 w-full max-w-[850px]">
            <p className="text-[70px] font-bold uppercase mt-[-20px]">
              {kategori} {liga}
            </p>
            <p className="text-[50px] mt-[-50px] mb-[30px] text-[#ff6508]">{season}</p>
          </div>

          <div
            className="relative z-20 w-full max-w-[850px]"
            style={{ marginTop: "635px" }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                color: "#ffffff",
                border: "3px solid #ffffff",
                borderRadius: "30px",
                overflow: "hidden",
              }}
            >
              <thead>  {/* ✅ DITAMBAHKAN */}
                <tr style={{ borderBottom: "3px solid #ffffff" }}>
                  <th
                    style={{
                      borderBottom: "3px solid #ffffff",
                      width: "10%",
                      padding: "3px 0",
                      fontSize: "30px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <p className="mb-5 mt-[-3px]">No</p>
                  </th>

                  <th
                    style={{
                      width: "65%",
                      borderBottom: "3px solid #ffffff",
                      padding: "3px 20px",
                      fontSize: "30px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    <p className="mb-5 mt-[-3px]">STANDINGS</p>
                  </th>

                  <th
                    style={{
                      width: "25%",
                      borderBottom: "3px solid #ffffff",
                      padding: "3px 20px",
                      fontSize: "30px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    <p className="mb-5 mt-[-3px]">P</p>
                  </th>
                  <th
                    style={{
                      width: "25%",
                      borderBottom: "3px solid #ffffff",
                      padding: "3px 20px",
                      fontSize: "30px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    <p className="mb-5 mt-[-3px]">PTS</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr
                  key={i}
                  style={{
                    borderBottom:
                      i !== players.length - 1
                        ? "3px solid #ffffff"
                        : "none",
                  }}
                >
                    {/* Nomor */}
                    <td
                      style={{
                        width: "5%",
                        borderBottom: "3px solid #ffffff",
                        padding: "2px 0",
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      <p className="mb-5 mt-[-3px]">{i + 1}</p>
                    </td>

                    {/* Nama */}
                    <td
                      style={{
                        borderBottom: "3px solid #ffffff",
                        width: "60%",
                        padding: "2px 20px",
                        fontSize: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      <p className="mb-5 mt-[-3px]">{p.nama}</p>
                    </td>

                    {/* main */}
                    <td
                      style={{
                        width: "10%",
                        borderBottom: "3px solid #ffffff",
                        padding: "2px 20px",
                        fontSize: "30px",
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      <p className="mb-5 mt-[-3px]">{p.main}</p>
                    </td>

                    {/* Jumlah */}
                    <td
                      style={{
                        width: "10%",
                        borderBottom: "3px solid #ffffff",
                        padding: "2px 20px",
                        fontSize: "30px",
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      <p className="mb-5 mt-[-3px]">{p.jumlah}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
