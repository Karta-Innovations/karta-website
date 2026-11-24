#!/usr/bin/env node
/**
 * Writes the vector logo files in public/brand and the app icons, from the
 * same outlines the site's <Mark> and <Wordmark> components draw.
 *
 *   node scripts/build-brand-assets.mjs            # SVG only
 *   FFMPEG=/path/to/ffmpeg node scripts/build-brand-assets.mjs   # SVG + PNG icons
 *
 * The PNG step needs an ffmpeg built with librsvg.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "brand");
mkdirSync(out, { recursive: true });

// The outlines live in the components; read them from there so there is one source.
const markSource = readFileSync(join(root, "components", "brand", "Mark.tsx"), "utf8");
const wordSource = readFileSync(join(root, "components", "brand", "Wordmark.tsx"), "utf8");
const grab = (source, name) => {
  const match = new RegExp(`${name}:?\\s*=?\\s*\\n?\\s*"([^"]+)"`).exec(source);
  if (!match) throw new Error(`Could not find ${name}`);
  return match[1];
};
const outer = grab(markSource, "outer");
const inner = grab(markSource, "inner");
const stem = grab(markSource, "stem");
const karta = grab(wordSource, "const KARTA");
const innovations = grab(wordSource, "const INNOVATIONS");

const INDIGO = "#0B0F2E";
const INK = "#141A47";
const CREAM = "#F4F0E8";

// The fix keeps the bronze of the master logo: its colour by angle, sampled every four degrees.
const bronze = JSON.parse(readFileSync(join(root, "components", "brand", "fix-sheen.json"), "utf8"));
const FIX = { cx: 136.262, cy: 108.535, r: 11.746 };
function bronzeFix() {
  const step = (Math.PI * 2) / bronze.sheen.length;
  const lap = step * 0.14;
  const at = (angle) => `${(FIX.cx + Math.cos(angle) * FIX.r).toFixed(3)} ${(FIX.cy + Math.sin(angle) * FIX.r).toFixed(3)}`;
  const wedges = bronze.sheen
    .map((fill, index) => `<path d="M${FIX.cx} ${FIX.cy}L${at(index * step - lap)}A${FIX.r} ${FIX.r} 0 0 1 ${at((index + 1) * step + lap)}Z" fill="${fill}"/>`)
    .join("");
  return `<circle cx="${FIX.cx}" cy="${FIX.cy}" r="${FIX.r}" fill="${bronze.base}"/>${wedges}`;
}

// The chevron and stem in one flat ink; the fix in bronze, or in the same ink for one-colour use.
function markBody(color, mono = false) {
  return [
    `<path d="${outer}" fill="${color}" opacity="${mono ? 1 : 0.42}"/>`,
    `<path d="${inner}" fill="${color}"/>`,
    `<path d="${stem}" fill="${color}"/>`,
    mono ? `<circle cx="${FIX.cx}" cy="${FIX.cy}" r="${FIX.r}" fill="${color}"/>` : bronzeFix(),
  ].join("");
}

function mark(color, mono = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="76 62 108 134" width="432" height="536"><title>Karta</title>${markBody(color, mono)}</svg>\n`;
}

function lockup(color, descriptor) {
  const wordHeight = 56;
  const wordWidth = (71.3 / 14.2) * wordHeight;
  const gap = 44;
  const width = Math.round(108 + gap + wordWidth);
  const descHeight = 22;
  const descWidth = (100.6 / 10.4) * descHeight;
  const wordY = descriptor ? 26 : (134 - wordHeight) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 134" width="${width * 2}" height="268"><title>Karta Innovations</title><svg x="0" y="0" width="108" height="134" viewBox="76 62 108 134">${markBody(color)}</svg><svg x="${108 + gap}" y="${wordY}" width="${wordWidth}" height="${wordHeight}" viewBox="79.3 114.1 71.3 14.2"><path d="${karta}" fill="${color}" fill-rule="evenodd"/></svg>${
    descriptor
      ? `<svg x="${108 + gap}" y="${wordY + wordHeight + 12}" width="${descWidth}" height="${descHeight}" viewBox="79 134.6 100.6 10.4"><path d="${innovations}" fill="${descriptor}" fill-rule="evenodd"/></svg>`
      : ""
  }</svg>\n`;
}

function icon(size, inset) {
  const box = 134 / (1 - inset * 2);
  const offsetX = 76 - (box - 108) / 2;
  const offsetY = 62 - (box - 134) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${offsetX} ${offsetY} ${box} ${box}" width="${size}" height="${size}"><rect x="${offsetX}" y="${offsetY}" width="${box}" height="${box}" fill="${INDIGO}"/>${markBody(CREAM)}</svg>\n`;
}

// The site ships only its icons. The full set of marks and lockups lives in the
// brand kit outside this repository; uncomment the lines below to write them here.
const files = {
  // "karta-mark-on-indigo.svg": mark(CREAM),
  // "karta-mark-on-cream.svg": mark(INK),
  // "karta-mark-mono-cream.svg": mark(CREAM, true),
  // "karta-mark-mono-indigo.svg": mark(INK, true),
  // "karta-lockup-on-indigo.svg": lockup(CREAM),
  // "karta-lockup-on-cream.svg": lockup(INK),
  // "karta-lockup-full-on-indigo.svg": lockup(CREAM, CREAM),
  // "karta-lockup-full-on-cream.svg": lockup(INK, INK),
  "karta-icon.svg": icon(512, 0.2),
};
void [INK, mark, lockup]; // kept for the lines above
for (const [name, body] of Object.entries(files)) writeFileSync(join(out, name), body);
writeFileSync(join(root, "app", "icon.svg"), icon(64, 0.16));
console.log(`Wrote ${Object.keys(files).length} SVG files to public/brand and app/icon.svg`);

const ffmpeg = process.env.FFMPEG;
if (ffmpeg) {
  const raster = (svg, size, target) => {
    const temp = join(out, `.tmp-${size}.svg`);
    writeFileSync(temp, svg);
    execFileSync(ffmpeg, ["-v", "error", "-y", "-i", temp, "-vf", `scale=${size}:${size}`, "-frames:v", "1", target]);
    execFileSync("rm", ["-f", temp]);
  };
  raster(icon(512, 0.22), 512, join(out, "karta-icon-512.png"));
  raster(icon(512, 0.22), 192, join(out, "karta-icon-192.png"));
  raster(icon(512, 0.18), 180, join(root, "app", "apple-icon.png"));
  // favicon.ico: one 48 px PNG inside an ICO container.
  const png48 = join(out, ".tmp-favicon.png");
  raster(icon(64, 0.16), 48, png48);
  const png = readFileSync(png48);
  execFileSync("rm", ["-f", png48]);
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(48, 6);
  header.writeUInt8(48, 7);
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset of the image data
  writeFileSync(join(root, "app", "favicon.ico"), Buffer.concat([header, png]));
  console.log("Wrote PNG icons and favicon.ico");
}
