"use client";

import React, { useRef, useEffect } from "react";
import { OrchardProjection } from "@/app/(orchard)/types/search";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

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
        <div className="flex items-center gap-2">
          <Button
            onClick={handleClearSelection}
            className="bg-[#bc2635] text-white hover:bg-[#bc2635]/90"
          >
            Clear selection
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" className="h-8 w-8 p-0">
                <QuestionMarkCircledIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p>
                This is an interactive scatterplot displaying a 2D projection of
                the Nomic embedding of bioRxiv. Points that are closer to each
                other are nearer in embedding space, indicating semantic
                similarity.
                <br />
                <br />
                The plot can zoom and pan. Click and drag on the plot while
                holding{" "}
                <kbd className="px-2 py-1 text-sm bg-gray-200 rounded">
                  shift
                </kbd>{" "}
                to select multiple points. Selected points will be highlighted
                and their corresponding papers will be shown in the side panel.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="outline outline-black rounded-lg flex-1">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default Scatterplot;
