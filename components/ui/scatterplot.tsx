"use client";

import React, { useRef, useEffect, useState } from "react";

const Scatterplot: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setScatterplot] = useState<any>(null);

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
      });

      setScatterplot(newScatterplot);

      const points = new Array(10000)
        .fill(0)
        .map(() => [
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          Math.random() < 0.1 ? [0.737, 0.149, 0.208, 1] : [0, 0, 0, 1],
        ]);

      newScatterplot.draw(points);

      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        newScatterplot.set({ width, height });
      });

      resizeObserver.observe(parent);
      return () => resizeObserver.disconnect();
    };

    initScatterplot();
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Scatterplot;
