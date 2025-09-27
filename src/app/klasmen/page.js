"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export default function KlasmenEditor() {
  const [baseImage, setBaseImage] = useState(null); // background pemain
  const [klasmenImage, setKlasmenImage] = useState(null); // gambar klasmen
  const [quote, setQuote] = useState("");

  const handleBaseUpload = (e) => {
    if (e.target.files?.[0]) setBaseImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleKlasmenUpload = (e) => {
    if (e.target.files?.[0]) setKlasmenImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = async () => {
    const element = document.getElementById("quote-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "klasmen.png";
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-[#ff6508] text-white">
      <h1 className="text-3xl font-bold mb-6">Klasmen Editor</h1>

      {/* Upload Background */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar Background</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleBaseUpload}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Upload Klasmen */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar Klasmen</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleKlasmenUpload}
          className="border rounded px-3 py-2 w-full text-black"
        />
      </div>

      {/* Input Quotes */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Quotes</p>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="border rounded px-3 py-2 w-full h-32 text-black"
          placeholder="Tulis quotes di sini..."
        />
      </div>

      <button
        onClick={handleDownload}
        className="bg-white text-[#ff6508] font-bold px-6 py-2 rounded hover:bg-gray-200"
      >
        Download Hasil
      </button>

      {/* Preview */}
      {baseImage && (
        <div
          id="quote-preview"
          className="relative mt-8 w-[1080px] h-[1080px] border bg-black overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Klasmen di kiri */}
          {klasmenImage && (
            <img
              src={klasmenImage}
              alt="Klasmen"
              className="absolute top-0 left-0 h-full mb-5 w-[350px] object-contain bg-white p-2"
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-[100%]"
            style={{
              background: "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
            }}
          />

          {/* Embed Klasemen di kiri, full tinggi */}
          <div className="absolute left-0 top-0 h-[1075px] w-[350px] p-1 z-20">
            <iframe
              width="100%"
              height="80%"
              src="https://widget.jpnn.com/football/landscape"
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Logo */}
          <div className="absolute top-5 right-[50px] z-30">
            <img
              src="/assets/cf.png"
              className="w-[120px] h-[120px] object-contain"
            />
          </div>

          {/* Quote di kanan */}
          <div className="absolute top-0 right-0 w-[700px] p-10 text-white flex flex-col items-center mt-60 z-30">
            <p
              className="text-center italic"
              style={{ fontSize: "80px", lineHeight: "1.2" }}
            >
              <span className="text-[#ff6508]">" </span>
              {quote}
              <span className="text-[#ff6508]"> "</span>
            </p>
          </div>
          <div className="absolute justify-center items-center left-120 bottom-0 mb-10" style={{ fontSize: "22px"}}>
              <p>centrafootball</p>
              </div>
        </div>
      )}
    </main>
  );
}
