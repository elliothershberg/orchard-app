"use client";

import React, { useRef, useEffect, useState } from "react";
import createScatterplot from "regl-scatterplot";

const Scatterplot: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scatterplot, setScatterplot] = useState<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();

    const newScatterplot = createScatterplot({
      canvas,
      width,
      height,
      pointSize: 3,
      pointColor: [0, 0, 0, 1], // Black color (RGBA)
      backgroundColor: [1, 1, 1, 1], // White background
    });

    setScatterplot(newScatterplot);

    // Generate 10,000 random points
    const points = new Array(10000).fill().map(() => [
      -1 + Math.random() * 2,
      -1 + Math.random() * 2,
      Math.random() < 0.1 ? [0.737, 0.149, 0.208, 1] : [0, 0, 0, 1], // 10% red points, 90% black points
    ]);

    newScatterplot.draw(points);

    const handleResize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      newScatterplot.resize({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      newScatterplot.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
};

export default Scatterplot;
