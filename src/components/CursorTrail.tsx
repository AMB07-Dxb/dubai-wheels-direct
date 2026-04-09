import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number }[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.current.length > 40) points.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = points.current;
      for (let i = 0; i < pts.length; i++) {
        pts[i].age += 1;
        const alpha = Math.max(0, 1 - pts[i].age / 25);
        const radius = Math.max(0.5, (1 - pts[i].age / 25) * 3);
        if (alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 85%, 50%, ${alpha * 0.35})`;
        ctx.fill();
      }
      points.current = pts.filter(p => p.age < 25);
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

export default CursorTrail;
