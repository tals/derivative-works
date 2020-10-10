import { CDN_ROOT } from "./config";
import {Collage} from "./dataTypes"

function pad(x: number, leading: number) {
  return x.toString().padStart(leading, "0");
}
export function getPaletteUrl(collage: Collage, palette: number) {
  return `${CDN_ROOT}/results/${collage.path}/palette/${pad(palette, 4)}.jpg`;
}

export function getFinalImage(collage: Collage) {
  return `${CDN_ROOT}/results/${collage.path}/${collage.key}.jpg`;
}

export function getFirstFrame(collage: Collage) {
  return `${CDN_ROOT}/results/${collage.path}/${collage.key}_frame0.jpg`;
}

export function getLastFrame(collage: Collage) {
  return `${CDN_ROOT}/results/${collage.path}/${collage.key}_small.jpg`;
}

export function getMaskCanvasSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/results/${collage.path}/masks/${pad(piece, 4)}_canvas.png`
}

export function getMaskPieceSpace(collage: Collage, piece: number) {
  return `${CDN_ROOT}/results/${collage.path}/masks/${pad(piece, 4)}_palett.png`
}

export function getLutUrl(collage: Collage) {
  return `${CDN_ROOT}/results/${collage.path}/lut_${collage.key}.png`;
}

export function getVideoUrl(collage: Collage, small=false) {
  return `${CDN_ROOT}/results/${collage.path}/${collage.key}_fast${small ? '_small' : ''}.mp4`;
}

export function getArtbreederUrl(palette_key: string) {
  return `https://artbreeder.com/i?k=${palette_key}`;
}