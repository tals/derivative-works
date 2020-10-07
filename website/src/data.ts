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
    path: "2020-10-06-16-26-osynxk",
    key: "osynxk",
    palette: paletteRange(4),
  },
  {
    name: "some other thing",
    path: "2020-10-06-22-05-ivkejg",
    key: "ivkejg",
    palette: paletteRange(3),
  }
];

