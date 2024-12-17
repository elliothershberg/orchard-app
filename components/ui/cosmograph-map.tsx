"use client";

import { useRef, useEffect } from "react";
import { Cosmograph } from "@cosmograph/cosmograph";

// Define types for nodes and links
interface Node {
  id: string;
  color?: string;
  // Add other node properties as needed
}

interface Link {
  source: string;
  target: string;
  // Add other link properties as needed
}

interface CosmographMapProps {
  nodes: Node[];
  links: Link[];
}

const defaultConfig = {
  nodeSize: 20,
  linkWidth: 2,
  nodeColor: (d: Node) => d.color || "#666",
  backgroundColor: "#ffffff",
};

export default function CosmographMap({ nodes, links }: CosmographMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cosmographRef = useRef<Cosmograph<Node, Link> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Cosmograph
    cosmographRef.current = new Cosmograph(containerRef.current, defaultConfig);

    // Set initial data
    cosmographRef.current.setData(nodes, links);

    // Cleanup on unmount
    return () => {
      if (cosmographRef.current) {
        cosmographRef.current.remove();
      }
    };
  }, []); // Empty dependency array as we only want to initialize once

  // Update data when props change
  useEffect(() => {
    if (cosmographRef.current) {
      cosmographRef.current.setData(nodes, links);
    }
  }, [nodes, links]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    />
  );
}
