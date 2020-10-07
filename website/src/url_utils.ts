import { CDN_ROOT } from "./config";
import {Collage} from "./dataTypes"

function pad(x: number, leading: number) {
  return x.toString().padStart(leading, "0");
}
export function getPaletteUrl(collage: Collage, palette: number) {
  return `${CDN_ROOT}/${collage.path}/palette/${pad(palette, 4)}.jpg`;
}

export function getFinalImage(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/${collage.key}.jpg`;
}

export function getMaskCanvasSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/${collage.path}/masks/${pad(piece, 4)}_canvas.png`
}

export function getMaskPieceSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/${collage.path}/masks/${pad(piece, 4)}_palett.png`
}

export function getLutUrl(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/lut_${collage.key}.png`;
}

export function getVideoUrl(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/${collage.key}.mp4`;
}