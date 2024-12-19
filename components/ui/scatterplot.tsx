"use client";

import React, { useRef, useEffect } from "react";
import { OrchardProjection } from "@/app/types/search";

interface ScatterplotProps {
  plotData: OrchardProjection[];
  setSelectedPoints: (points: number[]) => void;
}

const Scatterplot: React.FC<ScatterplotProps> = ({
  plotData,
  setSelectedPoints,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scatterplotRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
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
        showReticle: true,
      });

      // Store the scatterplot instance
      scatterplotRef.current = newScatterplot;

      // Subscribe to selection events
      newScatterplot.subscribe("select", ({ points }) => {
        setSelectedPoints(points);
      });

      // Subscribe to deselection events
      newScatterplot.subscribe("deselect", () => {
        setSelectedPoints([]);
      });

      // Format is [x, y, valueA, opacity]
      const points = plotData.map((result) => [
        result.x,
        result.y,
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

      // Cleanup function
      return () => {
        resizeObserver.disconnect();
        if (scatterplotRef.current) {
          scatterplotRef.current.destroy();
          scatterplotRef.current = null;
        }
      };
    };

    initScatterplot();
  }, [plotData, setSelectedPoints]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Scatterplot;
