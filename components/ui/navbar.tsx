"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold tracking-tight">
                o<span className="text-[#bc2635]">R</span>chard
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className={`text-black hover:text-white hover:bg-[#bc2635] ${
                pathname === "/search" ? "bg-[#bc2635] text-white" : ""
              }`}
            >
              <Link href="/search">Search</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`text-black hover:text-white hover:bg-[#bc2635] ${
                pathname === "/study" ? "bg-[#bc2635] text-white" : ""
              }`}
            >
              <Link href="/study">Study</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`text-black hover:text-white hover:bg-[#bc2635] ${
                pathname === "/scan" ? "bg-[#bc2635] text-white" : ""
              }`}
            >
              <Link href="/scan">Scan</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
