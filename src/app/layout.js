import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Terga",
  description: "Random things by a programmer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="font-sans grid items-center justify-items-center p-8 pb-20 gap-8 sm:p-20">
          <header className="flex flex-row row-start-1 justify-start w-full gap-4 text-center">
            <Image
              className="dark:invert"
              src="/logo.svg"
              alt="Terga logo"
              width={150}
              height={30}
              priority
            />
            <div className="my-auto flex flex-col items-start">
              <h1 className="text-4xl font-bold">Terga</h1>
              <p className="my-auto px-0 text-left">Random things by a programmer.</p>
            </div>
          </header>
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start m-auto w-full">
            {children}
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

          </footer>
        </div>

      </body>
    </html>
  );
}
