import range from "lodash/range";
import fromPairs from "lodash/fromPairs";
import {Collage} from "./dataTypes";
// for when there's no metadata about the palette pieces
  const paletteRange = (count: number) =>
    range(count).map((x) => ({
      name: null,
    }));

export const EXHIBITS: Record<string, Collage> = fromPairs([
  {
    name: "IDK",
    path: "2020-10-06-07-56-uvdsrj",
    key: "uvdsrj",
    palette: paletteRange(3),
  },
  {
    name: "IDK",
    path: "2020-10-06-07-59-loxfpl",
    key: "loxfpl",
    palette: paletteRange(3),
  },
].map(x => [x.key, x]))

