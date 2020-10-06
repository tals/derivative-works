import range from "lodash/range";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));


export const EXHIBITS: Record<string, Collage> = {
  "first": {
    name: "IDK",
    path: "2020-10-05-23-04-gdvkyd",
    steps: 600,
    palette: paletteRange(3),
  },
};

