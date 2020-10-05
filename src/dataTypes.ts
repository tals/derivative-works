export interface Palette {
  name: string | null;
}

export interface Collage {
  name: string;
  path: string;
  final_image: string;
  palette: Palette[];
}
