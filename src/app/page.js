'use client';

import Image from "next/image";
import { Widget as Chemistry } from "./chemistry/widget";
import { Widget as Comments } from "./comments/widget";

export default function Home() {
  return (
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
          <p className="my-auto">Random things by a programmer.</p>
        </div>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start m-auto w-full">
        <Chemistry />
        <Comments />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
