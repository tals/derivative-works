import range from "lodash/range";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));


export const EXHIBITS: Record<string, Collage> = {
  "seed_3": {
    name: "seed 3",
    path: "first",
    final_image: "canvas/canvas_step_0699.png",
    palette: paletteRange(32),
  }
};

