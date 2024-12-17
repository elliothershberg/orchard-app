interface Node {
  id: string;
  label: string;
  color: string;
  size?: number;
  group?: string;
}

interface Link {
  source: string;
  target: string;
  color: string;
}

export const nodes: Node[] = [
  { id: "apple", label: "Apple", color: "#ff6b6b", group: "core", size: 25 },
  { id: "banana", label: "Banana", color: "#ffd93d", group: "tropical" },
  { id: "orange", label: "Orange", color: "#ff9f43", group: "citrus" },
  { id: "lemon", label: "Lemon", color: "#fff3b0", group: "citrus" },
  { id: "lime", label: "Lime", color: "#a8e6cf", group: "citrus" },
  { id: "grape", label: "Grape", color: "#6c5ce7", group: "berry" },
  { id: "strawberry", label: "Strawberry", color: "#ff8080", group: "berry" },
  { id: "blueberry", label: "Blueberry", color: "#4834d4", group: "berry" },
  { id: "mango", label: "Mango", color: "#ffa502", group: "tropical" },
  { id: "pineapple", label: "Pineapple", color: "#ffbe76", group: "tropical" },
];

export const links: Link[] = [
  { source: "apple", target: "banana", color: "#ffffff55" },
  { source: "orange", target: "lemon", color: "#ffffff55" },
  { source: "lemon", target: "lime", color: "#ffffff55" },
  { source: "grape", target: "strawberry", color: "#ffffff55" },
  { source: "strawberry", target: "blueberry", color: "#ffffff55" },
  { source: "mango", target: "pineapple", color: "#ffffff55" },
  { source: "banana", target: "mango", color: "#ffffff55" },
  { source: "apple", target: "strawberry", color: "#ffffff55" },
  { source: "orange", target: "mango", color: "#ffffff55" },
];
