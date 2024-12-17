import FruitNetwork from "@/components/ui/FruitNetwork";

export default function FruitNetworkPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Fruit Network Visualization</h1>
      <div className="card">
        <FruitNetwork />
      </div>
    </main>
  );
}
