import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-black">
      <div className="w-full max-w-3xl mx-auto text-center px-4">
        <h1 className="mb-2 text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
          o<span className="text-[#bc2635]">R</span>chard
        </h1>
        <p className="mb-8 text-xl font-medium text-gray-600">
          Exponential knowledge, distilled
        </p>

        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            className="w-full sm:w-auto sm:flex-1 bg-black text-white hover:bg-gray-800"
          >
            <Link href="/search">Search the oRchard</Link>
          </Button>
          <Button className="w-full sm:w-auto sm:flex-1 bg-[#bc2635] text-white hover:bg-[#a61f2d]">
            Scan the oRchard
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto sm:flex-1 border-black text-black hover:bg-gray-100"
          >
            Study a topic
          </Button>
        </div>

        <div className="mt-16">
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-[#bc2635] transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </main>
  );
}
