import { Navbar } from "@/components/ui/navbar";

export default function OrchardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto relative">{children}</main>
    </div>
  );
}
