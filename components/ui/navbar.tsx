import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-black hover:text-[#bc2635] hover:bg-gray-100"
            >
              <Link href="/search">Search</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-black hover:text-[#bc2635] hover:bg-gray-100"
            >
              <Link href="/scan">Scan</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
