import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

const CodeRainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Code characters to rain down
    const chars =
      "01{}[];()=>const let var function return if else for while true false null undefined".split(
        ""
      );
    const drops: Array<{
      x: number;
      y: number;
      speed: number;
      char: string;
      opacity: number;
    }> = [];

    // Initialize drops
    for (let i = 0; i < 50; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(13, 13, 13, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.fillStyle = `rgba(0, 255, 163, ${drop.opacity})`;
        ctx.font = "14px monospace";
        ctx.fillText(drop.char, drop.x, drop.y);

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
          drop.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    />
  );
};

export default CodeRainBackground;
