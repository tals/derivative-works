import range from "lodash/range";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));


export const EXHIBITS: Record<string, Collage> = {
  "first": {
    name: "sideways dude",
    path: "2020-10-05-08-55-31-57665",
    steps: 700,
    palette: paletteRange(64),
  },
  "second": {
    name: "Second",
    path: "2020-10-05-08-59-57-16078",
    steps: 700,
    palette: paletteRange(64),
  }

};

