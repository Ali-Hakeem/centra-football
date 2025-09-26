import "./globals.css";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Editor Gambar",
  description: "Next.js overlay editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.className} bg-[#ff6508]`}>
        {children}
      </body>
    </html>
  );
}
