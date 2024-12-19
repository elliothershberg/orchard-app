import { Navbar } from "@/components/ui/navbar";

export default function OrchardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
