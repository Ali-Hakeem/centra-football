"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export default function InfoEditor() {
  const [baseImage, setBaseImage] = useState(null);
  const [quote, setQuote] = useState("");
  const [quote2, setQuote2] = useState("");

  const handleFile = (e) => {
    if (e.target.files?.[0]) setBaseImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = async () => {
    const element = document.getElementById("quote-preview");
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
    link.download = "quote.png";
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-[#ff6508] text-white">
      <h1 className="text-3xl font-bold mb-6">Info Editor</h1>

      {/* Upload Gambar */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar Rasio 4:5</p>
        <input type="file" accept="image/*" onChange={handleFile} className="border rounded px-3 py-2 w-full text-black"/>
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

      {/* Input Quotes */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Quotes2</p>
        <textarea
          value={quote2}
          onChange={(e) => setQuote2(e.target.value)}
          className="border rounded px-3 py-2 w-full h-32 text-black"
          placeholder="Tulis quotes di sini..."
        />
      </div>

      <button
        onClick={handleDownload}
        className="bg-white text-[#ff6508] font-bold px-6 py-2 rounded hover:bg-gray-200"
      >
        Download Quote
      </button>

      {/* Preview */}
        {baseImage && quote && quote2 && (
        <div
          id="quote-preview"
          className="relative mt-8 overflow-hidden"
          style={{
            width: "1080px",
            height: "1350px",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${baseImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="absolute justify-center items-center gap-12 left-10">
                <img src="/assets/cf.png" className="w-[120px] h-[120px] object-contain"></img>
            </div>
            
            {/* Gradient overlay */}
            <div
            className="absolute bottom-0 left-0 w-full h-full"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,1.2), transparent)" }}
            />

            <div className="absolute bottom-0 left-0 w-full px-15 text-white flex flex-col items-center mb-65 top-210">
                <p className="text-center font-bold">
                  <span className="text-[#ff6508]" style={{ fontSize: "140px", lineHeight: "0.9" }}>{quote}</span>
                </p>
                <p className="text-center font-bold mt-[30px]">
                  <span style={{ fontSize: "80px", lineHeight: "0.9" }}> {quote2}</span>
                </p>      
              <div className="absolute justify-center items-center left-120 top-90 mt-5" style={{ fontSize: "22px"}}>
              <p>centrafootball</p>
              </div>
            </div>
        </div>
      )}
    </main>
  );
}
