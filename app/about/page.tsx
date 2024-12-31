import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - oRchard",
  description: "About the oRchard",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="p-4">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tight">
              o<span className="text-[#bc2635]">R</span>chard
            </span>
          </Link>
        </div>
      </div>
      <div className="pt-20">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto px-6">
          <div className="relative w-full h-[512px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/orchard-image.png"
              alt="Orchard Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <blockquote className="w-full italic text-gray-700 text-lg leading-relaxed border-l-4 border-gray-300 pl-4">
            Science, before 1800, was like an orchard: tame, well laid-out and
            ordered; fragrant and fruit-bearing. One could wander through it
            from end to end observing its various parts; and from a neighboring
            hill, one might even see the entire scheme, and appreciate it.
            <br />
            <br />
            But by 1800, the wanderers noted that the busy planters, gardeners
            and cultivators had done their work so well that parts of it had
            grown dark and foreboding. Order was still there, indeed the
            intricate network of relationships was more refined, more subtle and
            more fascinating than ever; but the proliferating branches had begun
            to shut out the sky.
            <br />
            <br />
            And then there came the shock of realizing that the orchard was too
            large. One could no longer pass through it from end to end—not
            without getting lost and walking in circles back to one&apos;s
            starting point. Nor was the neighboring bill any longer of use, for
            it, too, was covered by orchard now.
            <br />
            <br />
            So some of the observers, some of the lovers of the beauty of order,
            abandoned the orchard altogether; while others compromised by
            confining themselves to narrow sections of the orchard, then to
            narrower sections and still narrower sections.
            <br />
            <br />
            Now, the orchard of science is a vast globe-encircling monster,
            without a map, and known to no one man; indeed, to no group of men
            fewer than the whole international mass of creative scientists.
            Within it, each observer clings to his own well-known and well-loved
            clump of trees. If he looks beyond, it is usually with a guilty
            sigh.
            <br />
            <br />
            <span className="text-right block">- Isaac Asimov (1963)</span>
          </blockquote>
          <hr className="w-32 border-black mt-8" />
          <div className="w-full space-y-6 text-gray-700 text-lg leading-relaxed py-8">
            <p>
              Founded in 2013,{" "}
              <Link href="https://www.biorxiv.org" className="text-[#bc2635]">
                bioRxiv
              </Link>{" "}
              has emerged as the de facto preprint server for the life sciences.
              It has gained widespread adoption across nearly every field of
              biological research. The number of preprints has grown
              exponentially—now totaling over 250,000 original studies. This
              represents a challenge and an opportunity.
            </p>
            <p>
              As Asimov beautifully described over sixty years ago, no scientist
              can ever explore the entire o
              <span className="text-[#bc2635]">R</span>chard of science
              themselves. This firehose of new findings is evidence of this
              fact.
            </p>
            <p>
              But we now have the tools to produce a map of the territory.
              bioRxiv provides a robust{" "}
              <Link href="https://api.biorxiv.org/" className="text-[#bc2635]">
                API
              </Link>{" "}
              for programmatically mining the contents of the server. As
              artificial intelligence continues to master natural language,
              powerful embedding models have emerged that are capable of finding
              structure in massive corpuses of text. Modern Web browsers can now
              render interactive visualizations with millions of data points.
            </p>
            <p>
              o<span className="text-[#bc2635]">R</span>chard is an attempt to
              synthesize these advances and create a living map of bioRxiv. It
              is built on a{" "}
              <Link
                href="https://arxiv.org/abs/2402.01613"
                className="text-[#bc2635]"
              >
                Nomic embedding
              </Link>{" "}
              of the entirety of bioRxiv. Portions—or the entirety—of the
              embedding can be explored with a{" "}
              <Link
                href="https://github.com/flekschas/regl-scatterplot"
                className="text-[#bc2635]"
              >
                WebGL-powered scatterplot
              </Link>{" "}
              originally developed by Fritz Lekschas.
            </p>
            <p>The application consists of three integrated tools:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <span className="font-semibold">Search:</span> kNN search of the
                embedding space (most granular)
              </li>
              <li>
                <span className="font-semibold">Study:</span> selecting topics
                of varying depth produced from the Nomic embedding (mid-range)
              </li>
              <li>
                <span className="font-semibold">Scan:</span> exploring search
                results, topics, or the entirety embedding space in an
                interactive visualization (30,000 foot view)
              </li>
            </ol>
            <p>
              My hope is that this tool will help reveal{" "}
              <Link
                href="https://doi.org/10.1016/j.patter.2024.100968"
                className="text-[#bc2635]"
              >
                new research patterns
              </Link>{" "}
              and help scientists{" "}
              <Link
                href="https://doi.org/10.1016/j.cell.2024.03.012"
                className="text-[#bc2635]"
              >
                pick better problems
              </Link>
              .
            </p>
            <p className="font-semibold">
              Enjoy the{" "}
              <Link
                href="https://en.wikipedia.org/wiki/View_from_a_Height"
                className="text-[#bc2635]"
              >
                View From a Height
              </Link>
              .
            </p>
            <div className="flex justify-center">
              <Button
                asChild
                variant="outline"
                className="gap-2 text-black hover:text-white hover:bg-[#bc2635] border-[#bc2635] group"
              >
                <Link href="https://github.com/">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 group-hover:fill-white"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
