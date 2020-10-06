export interface Palette {
  name: string | null;
}

export interface Collage {
  name: string;
  path: string;
  key: string; // damnt joel
  palette: Palette[];
}
