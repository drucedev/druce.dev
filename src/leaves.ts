const canvas = document.createElement("canvas");
canvas.id = "bg";
canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("No 2D context");

const LEAF_COUNT = 16;
const ACCENT = "#8ec07c";

interface Leaf {
  x: number;
  y: number;
  size: number;
  angle: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
}

let W = innerWidth;
let H = innerHeight;

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  W = canvas.width = innerWidth * dpr;
  H = canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function spawn(): Leaf {
  return {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    size: Math.random() * 28 + 16,
    angle: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.003,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    opacity: Math.random() * 0.08 + 0.03,
  };
}

resize();
const leaves: Leaf[] = Array.from({ length: LEAF_COUNT }, spawn);

function drawLeaf(
  x: number,
  y: number,
  size: number,
  angle: number,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(size / 20, size / 20);

  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.bezierCurveTo(6, -6, 8, 0, 0, 10);
  ctx.bezierCurveTo(-8, 0, -6, -6, 0, -10);
  ctx.closePath();

  ctx.fillStyle = ACCENT;
  ctx.globalAlpha = opacity;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 8);
  ctx.strokeStyle = ACCENT;
  ctx.globalAlpha = opacity * 0.5;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

function draw() {
  if (document.hidden) return;
  ctx.clearRect(0, 0, W, H);

  for (const leaf of leaves) {
    leaf.x += leaf.vx;
    leaf.y += leaf.vy;
    leaf.angle += leaf.rotSpeed;

    const pad = leaf.size;
    if (leaf.x < -pad) leaf.x = innerWidth + pad;
    if (leaf.x > innerWidth + pad) leaf.x = -pad;
    if (leaf.y < -pad) leaf.y = innerHeight + pad;
    if (leaf.y > innerHeight + pad) leaf.y = -pad;

    drawLeaf(leaf.x, leaf.y, leaf.size, leaf.angle, leaf.opacity);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

addEventListener("resize", resize);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) requestAnimationFrame(draw);
});
draw();
