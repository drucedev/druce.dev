/**
 * Canvas 2D falling linden leaves.
 *
 * Heart-shaped leaves with a drawn-out tip and toothed margin tumble down on
 * a light breeze, rocking and turning in fake 3D (the paler underside shows
 * as they flip). Lindens (Unter den Linden) are a quiet hint at Berlin
 * without naming it.
 */
const canvas = document.createElement("canvas");
canvas.className = "leaves";
document.body.prepend(canvas);

const context = canvas.getContext("2d");
if (!context) throw new Error("No 2D context");
const ctx: CanvasRenderingContext2D = context;

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const LEAF_COLORS = ["#8ec07c", "#689d6a", "#b8bb26", "#8ec07c", "#689d6a", "#d79921"];
const LEAF_COUNT = 10;

// Heart-curve units: tip at TIP, petiole end at y = 16; LEN maps the leaf to length 1.
const TIP = -6 - 11 * 1.3;
const LEN = 16 - TIP;

/** Linden outline plus petiole. Origin at the petiole end, tip at (0, -1). */
function lindenOutline(): Path2D {
  const path = new Path2D();
  const steps = 90;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    let x = 16 * Math.sin(t) ** 3;
    let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    // Narrow and draw out the tip.
    if (y < -6) {
      x *= 1 - ((-6 - y) / 11) * 0.55;
      y = -6 + (y + 6) * 1.3;
    }
    if (x > 0 && y > 0) y *= 1.1;
    const tooth = i % 2 ? 0.45 / Math.hypot(x, y + 3) : 0;
    x += x * tooth;
    y += (y + 3) * tooth;
    path.lineTo(x / LEN, (y - 16) / LEN);
  }
  path.closePath();
  path.moveTo(0.012, 0);
  path.lineTo(0.012, -11 / LEN);
  path.lineTo(-0.012, -11 / LEN);
  path.lineTo(-0.012, 0);
  return path;
}

function lindenVeins(): Path2D {
  const path = new Path2D();
  path.moveTo(0, -11 / LEN);
  path.lineTo(0, -0.97);
  for (const [y, w] of [[-12, 0.3], [-17, 0.27], [-22, 0.16]] as const) {
    for (const side of [-1, 1]) {
      path.moveTo(0, y / LEN);
      path.quadraticCurveTo(side * w * 0.5, (y - 3) / LEN, side * w, (y - 7) / LEN);
    }
  }
  return path;
}

const LEAF = lindenOutline();
const VEINS = lindenVeins();

interface Leaf {
  x: number;
  y: number;
  depth: number;
  size: number;
  spin: number;
  phase: number;
  color: string;
}

let W = 0;
let H = 0;
let dpr = 1;

function spawn(initial: boolean): Leaf {
  const depth = Math.random();
  const size = Math.min(W, H) * (0.025 + depth * 0.035);
  return {
    x: W * (-0.2 + Math.random() * 1.2),
    y: initial ? Math.random() * H : -size * 2,
    depth,
    size,
    spin: Math.random() * Math.PI * 2,
    phase: Math.random() * Math.PI * 2,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)] ?? "#8ec07c",
  };
}

function resize() {
  dpr = Math.min(devicePixelRatio, 2);
  W = innerWidth;
  H = innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
}

function render(time: number, dt: number) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < leaves.length; i++) {
    let leaf = leaves[i];
    if (!leaf) continue;
    if (!reducedMotion) {
      leaf.y += (0.25 + leaf.depth * 0.5) * dt;
      leaf.x += (0.15 + leaf.depth * 0.2 + Math.sin(time * 0.0011 + leaf.phase) * 0.5) * dt;
      leaf.spin += 0.002 * dt;
      if (leaf.y > H + leaf.size * 2 || leaf.x > W + leaf.size * 2) leaf = leaves[i] = spawn(false);
    }
    // Rocking plus tumbling: `twist` (-1..1) squashes the leaf to fake turning in 3D.
    const angle = leaf.spin + Math.sin(time * 0.0013 + leaf.phase) * 0.8;
    const twist = Math.cos(time * 0.0019 + leaf.phase);
    const cos = Math.cos(angle) * leaf.size * dpr;
    const sin = Math.sin(angle) * leaf.size * dpr;
    ctx.setTransform(cos * twist, sin * twist, -sin, cos, leaf.x * dpr, leaf.y * dpr);
    ctx.globalAlpha = (0.25 + leaf.depth * 0.45) * (twist < 0 ? 0.75 : 1);
    ctx.fillStyle = leaf.color;
    ctx.fill(LEAF);
    ctx.lineWidth = 0.02;
    ctx.strokeStyle = "rgb(29 32 33 / 0.35)";
    ctx.stroke(VEINS);
  }
  ctx.globalAlpha = 1;
}

let last = 0;

function frame(time: number) {
  if (document.hidden) {
    last = 0;
    return;
  }
  const dt = last ? Math.min((time - last) / 16.7, 3) : 1;
  last = time;
  render(time, dt);
  requestAnimationFrame(frame);
}

resize();
const leaves: Leaf[] = Array.from({ length: LEAF_COUNT }, () => spawn(true));

if (reducedMotion) {
  addEventListener("resize", () => {
    resize();
    render(0, 0);
  });
  render(0, 0);
} else {
  addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
}
