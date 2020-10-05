import { CDN_ROOT } from "./config";
import {Collage} from "./dataTypes"
export function getPaletteUrl(collage: Collage, palette: number) {
  return `${CDN_ROOT}/${collage.path}/palette/${palette.toString().padStart(4, '0')}.png`;
}

export function getFinalImage(collage: Collage) {
  return `${CDN_ROOT}/${collage.path}/${collage.final_image}`;
}