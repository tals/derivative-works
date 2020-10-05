export interface Palette {
  name: string | null;
}

export interface Collage {
  name: string;
  path: string;
  steps: number;
  palette: Palette[];
}
