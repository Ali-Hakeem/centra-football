"use client";

import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Preview() {
  const [data, setData] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const handleDownload = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      scale: 2, // increase resolution
    });
    const link = document.createElement("a");
    link.download = "preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!data)
    return <p className="p-10">Belum ada Silakan isi form dulu.</p>;

  const {
    wM,
    baseImage,
    overlayImage,
    overlayImage2,
    overlayImage3,
    kategori,
  } = data;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Preview Gambar</h1>

      <div
        ref={previewRef}
        className="relative w-[1080px] h-[1080px] border overflow-hidden bg-white"
      >
        {baseImage && (
          <img
            src={baseImage}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute flex justify-center items-center gap-12 left-10">
          <img
            src="/assets/cf.png"
            className="w-[120px] h-[120px] object-contain"
            alt="CF Logo"
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-[100%]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        />

        <div className="absolute flex left-120">
          {wM && (
            <img
              src={wM}
              alt="Watermark"
              className="justify-center items-center w-[100px] h-[100px] object-contain opacity-100"
            />
          )}
        </div>

        <div className="relative items-center left-38 justify-center z-50 flex flex-col gap-6 w-full max-w-[750px]">
            <p
              className="text-[50px] font-bold uppercase mt-[580px] text-white"
              style={{
                textShadow: "0 0 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.7)"
              }}
            >
              {/*HERE WE GO!!*/}
            </p>
          </div>

        {/* panah */}
        <div className="absolute bottom-40 left-0 w-full flex flex-col items-center text-white font-bold">
          <div className="p-1" style={{ marginBottom: "-150px", marginTop: "50px", marginLeft: "100px", marginRight: "100px" }}>
            {overlayImage3 && (
              <img
                src="/assets/panah.png"
                alt="panah"
                className="w-[120px] h-[120px] object-contain"
                style={{marginTop: "50px", marginLeft: "100px", marginRight: "100px" }}
              />
            )}
          </div>

          <div className="flex justify-center items-center gap-12 mt-4">
            {/* Left Logo in fixed square container */}
            {overlayImage && (
              <div className="w-[150px] h-[150px] flex justify-center items-center"
              style={{marginLeft: "50px", marginRight: "50px" }}
              >
                <img
                  src={overlayImage}
                  alt="Overlay Left"
                  className="object-contain max-w-full max-h-full"
                  draggable={false}
                />
              </div>
            )}

            {/* Scores */}
            <div className="flex items-center text-white font-bold">
                {/* panah */}
                <div style={{
                      margin: "290px 290px",
                      marginTop: "-100px",
                      userSelect: "none",
                    }} className="z-30 absolute flex justify-center items-center gap-100 left-120">
                    
                </div>
            </div>

            {/* Right Logo in fixed square container */}
            {overlayImage2 && (
              <div className="w-[150px] h-[150px] flex justify-center items-center"
              style={{marginLeft: "50px", marginRight: "50px" }}
              >
                <img
                  src={overlayImage2}
                  alt="Overlay Right"
                  className="object-contain max-w-full max-h-full"
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* nama player */}
          <div className="relative items-center justify-center z-50 flex flex-col gap-6 w-full max-w-[750px]">
            <p
              className="text-[80px] font-bold uppercase mt-[0px] text-white"
              style={{
                textShadow: "0 0 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.7)"
              }}
            >
              {kategori}
            </p>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col items-center max-h-[50px]"
            style={{ fontSize: "22px", marginBottom: "-110px", marginTop: "50px" }}
          >
            <p>centrafootball</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Download Preview
      </button>
    </main>
  );
}
