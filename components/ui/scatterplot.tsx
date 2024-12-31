"use client";

import React, { useRef, useEffect } from "react";
import { OrchardProjection } from "@/app/(orchard)/types/search";
import { Button } from "@/components/ui/button";

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

  const handleReset = () => {
    if (scatterplotRef.current) {
      scatterplotRef.current.reset();
    }
  };

  const handleClearSelection = () => {
    if (scatterplotRef.current) {
      scatterplotRef.current.deselect();
    }
  };

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
        opacityBy: "density" as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      });

      // Store the scatterplot instance
      scatterplotRef.current = newScatterplot;

      // Subscribe to selection events
      newScatterplot.subscribe("select", ({ points }) => {
        const selectedIds = points.map((index: number) => plotData[index].id);
        setSelectedPoints(selectedIds);
      });

      // Subscribe to deselection events
      newScatterplot.subscribe("deselect", () => {
        setSelectedPoints([]);
      });

      // Format is [x, y, valueA, opacity]
      const points = plotData.map((result) => [result.x, result.y]);

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

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <Button
          onClick={handleReset}
          className="bg-[#bc2635] text-white hover:bg-[#bc2635]/90"
        >
          Reset zoom
        </Button>
        <Button
          onClick={handleClearSelection}
          className="bg-[#bc2635] text-white hover:bg-[#bc2635]/90"
        >
          Clear selection
        </Button>
      </div>
      <div className="outline outline-black rounded-lg flex-1">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default Scatterplot;
