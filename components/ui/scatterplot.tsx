"use client";

import React, { useRef, useEffect } from "react";
import { SearchResult } from "@/app/types/search";

interface ScatterplotProps {
  data: SearchResult[];
}

const Scatterplot: React.FC<ScatterplotProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("Scatterplot received data:", data);

    const initScatterplot = async () => {
      if (!canvasRef.current) return;

      const { default: createScatterplot } = await import("regl-scatterplot");
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();

      const newScatterplot = createScatterplot({
        canvas,
        width,
        height,
        pointSize: 3,
        pointColor: [0, 0, 0, 1],
        backgroundColor: [1, 1, 1, 1],
      });

      // Transform the SearchResult data into the format expected by regl-scatterplot
      const xValues = data.map((d) => d.x);
      const yValues = data.map((d) => d.y);

      // Find the data boundaries
      const xMin = Math.min(...xValues);
      const xMax = Math.max(...xValues);
      const yMin = Math.min(...yValues);
      const yMax = Math.max(...yValues);

      // Add small padding to prevent points from sitting exactly on the edges
      const padding = 0.05; // 5% padding
      const xRange = (xMax - xMin) * (1 + padding);
      const yRange = (yMax - yMin) * (1 + padding);
      const xMid = (xMax + xMin) / 2;
      const yMid = (yMax + yMin) / 2;

      // Format is [x, y, valueA, opacity]
      const points = data.map((result) => [
        (result.x - xMid) / (xRange / 2), // normalize to [-1, 1] with padding
        (result.y - yMid) / (yRange / 2), // normalize to [-1, 1] with padding
        0, // valueA - could be used for coloring based on some property
        1, // opacity
      ]);

      newScatterplot.set({
        colorBy: "valueA",
        pointColor: [
          [0.737, 0.149, 0.208, 1],
          [0, 0, 0, 1],
        ],
      });

      newScatterplot.draw(points);

      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        newScatterplot.set({ width, height });
      });

      resizeObserver.observe(parent);
      return () => resizeObserver.disconnect();
    };

    initScatterplot();
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Scatterplot;
