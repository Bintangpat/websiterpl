"use client";
import { ModeToggle } from "@/components/ModeToggle";

export default function dashboard() {
  return (
    <div className="text-accent-foreground lex h-screen w-full flex-col gap-4 bg-neutral-900">
      <div className="grid h-full grid-cols-2 grid-rows-4 gap-2 rounded-sm p-2">
        <div className="bg-accent col-span-2 row-span-2 h-full w-full rounded-2xl">
          <div className="flex h-full w-full flex-col gap-4">
            <ModeToggle />
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <h1>selamat datang bintang </h1>
            </div>
          </div>
        </div>
        <div className="bg-accent h-full w-full rounded-2xl"></div>
        <div className="bg-accent h-full w-full rounded-2xl"></div>
        <div className="bg-accent h-full w-full rounded-2xl"></div>
        <div className="bg-accent h-full w-full rounded-2xl"></div>
      </div>
    </div>
  );
}
