// export interface Palette {
//   name: string | null;
// }

// export interface Collage {
//   name: string;
//   path: string;
//   key: string; // damnt joel
//   palette: Palette[];
// }


export interface Collage {
  key: string;
  // group: string;
  path: string;
  palette_keys: string[];
}
