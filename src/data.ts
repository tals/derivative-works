import range from "lodash/range";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));


export const EXHIBITS: Record<string, Collage> = {
  "first": {
    name: "first thing",
    path: "2020-10-05-08-29-30-28676",
    final_image: "canvas/0699.png",
    palette: paletteRange(32),
  },
  "second": {
    name: "sideways dude",
    path: "2020-10-05-08-37-36-96436",
    final_image: "canvas/0699.png",
    palette: paletteRange(32),
  }

};

