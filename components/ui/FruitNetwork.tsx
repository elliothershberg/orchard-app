"use client";

import { useRef, useEffect, useState } from "react";
import { Graph } from "@cosmograph/cosmos";
import { Button } from "./button";
import { nodes, links } from "./fruit-network-data";

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

interface GraphInstance {
  fitView: () => void;
  pause: () => void;
  start: () => void;
  destroy: () => void;
}

const config = {
  simulation: {
    repulsion: 0.8,
    centralGravity: 0.1,
    springLength: 100,
  },
  renderLinks: true,
  linkColor: (link: Link) => link.color,
  nodeColor: (node: Node) => node.color,
  nodeLabelColor: () => "#ffffff",
  nodeSize: (node: Node) => node.size || 20,
  renderNodeLabels: true,
  nodeLabelSize: 14,
  events: {
    onClick: (node: Node) => {
      console.log("Clicked fruit: ", node);
    },
  },
};

export default function FruitNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graph, setGraph] = useState<GraphInstance | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const graph = new Graph(canvas, config);
    setGraph(graph);
    graph.setData(nodes, links);

    return () => {
      graph.destroy();
    };
  }, []);

  const fitView = () => graph?.fitView();
  const togglePause = () => {
    if (!graph) return;
    if (paused) {
      graph.start();
    } else {
      graph.pause();
    }
    setPaused(!paused);
  };

  return (
    <div className="relative w-full h-[600px]">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" onClick={fitView}>
          Fit to view
        </Button>
        <Button variant="secondary" onClick={togglePause}>
          {paused ? "Start animation" : "Pause animation"}
        </Button>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
