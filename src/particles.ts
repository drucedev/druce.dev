const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const COUNT = 30;
const RGB = "53,135,33";

let W = innerWidth;
let H = innerHeight;

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}

function spawn(): Particle {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 3 + 2,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    a: Math.random() * 0.5 + 0.3,
  };
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
}

// Init canvas size before spawning particles
resize();
const particles: Particle[] = Array.from({ length: COUNT }, spawn);

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
    if (p.y < -20) p.y = H + 20;
    if (p.y > H + 20) p.y = -20;

    // Soft glow ring
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${RGB},${p.a * 0.15})`;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,255,180,${p.a})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

addEventListener("resize", resize);
draw();
