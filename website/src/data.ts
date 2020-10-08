import range from "lodash/range";
import fromPairs from "lodash/fromPairs";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));


export const EXHIBITS: Collage[] = [
  {
    name: "IDK",
    path: "website-dev/2020-10-06-17-42-aqvbwo",
    key: "aqvbwo",
    palette: paletteRange(3),
  },
  {
    name: "some other thing",
    path: "website-dev/2020-10-06-19-10-burkxl",
    key: "burkxl",
    palette: paletteRange(2),
  }
];

