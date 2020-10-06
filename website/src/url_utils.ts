import { CDN_ROOT } from "./config";
import {Collage} from "./dataTypes"

function pad(x: number, leading: number) {
  return x.toString().padStart(leading, "0");
}
export function getPaletteUrl(collage: Collage, palette: number) {
  return `${CDN_ROOT}/${collage.path}/palette/${pad(palette, 4)}.jpg`;
}

export function getFinalImage(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/canvas/${pad(collage.steps, 4)}.png`;
}

export function getMaskCanvasSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/${collage.path}/final_masks/${pad(piece, 4)}_trans.png`
}

export function getMaskPieceSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/${collage.path}/final_masks/${pad(piece, 4)}.png`
}

export function getLutUrl(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/masks/lut_${pad(collage.steps, 4)}.png`;
}