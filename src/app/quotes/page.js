"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export default function QuotesEditor() {
  const [baseImage, setBaseImage] = useState(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const handleFile = (e) => {
    if (e.target.files?.[0]) setBaseImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = async () => {
    const element = document.getElementById("quote-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "quote.png";
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-[#ff6508] text-white">
      <h1 className="text-3xl font-bold mb-6">Quotes Editor</h1>

      {/* Upload Gambar */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Upload Gambar</p>
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

      {/* Input Author */}
      <div className="mb-4 w-full max-w-xl">
        <p className="mb-2 font-semibold">Author</p>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded px-3 py-2 w-full text-black"
          placeholder="Nama penulis..."
        />
      </div>

      <button
        onClick={handleDownload}
        className="bg-white text-[#ff6508] font-bold px-6 py-2 rounded hover:bg-gray-200"
      >
        Download Quote
      </button>

      {/* Preview */}
        {baseImage && quote && (
        <div
            id="quote-preview"
            className="relative mt-8 w-[1080px] h-[1350px] border bg-white text-black overflow-hidden"
        >
            <img src={baseImage} alt="Base" className="absolute inset-0 w-full h-full object-cover" />

            <div className="absolute justify-center items-center gap-12 left-10">
                <img src="/assets/cf.png" className="w-[120px] h-[120px] object-contain"></img>
            </div>
            
            {/* Gradient overlay */}
            <div
            className="absolute bottom-0 left-0 w-full h-[110%]"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,1.2), transparent)" }}
            />

          <div className="absolute inset-0 flex justify-center items-center p-5 text-white top-150">
            <div className="flex flex-col items-center max-w-[984px]">
              <p
                className="text-center italic"
                style={{ fontSize: "75px", lineHeight: "1.1" }}
              >
                <span className="text-[#ff6508]">" </span>
                {quote}
                <span className="text-[#ff6508]"> "</span>
              </p>
              {author && (
                <p
                  className="text-center mt-10 font-semibold"
                  style={{ fontSize: "40px", lineHeight: "1.1" }}
                >
                  - {author}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
