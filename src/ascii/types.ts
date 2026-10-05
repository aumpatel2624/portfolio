export type AsciiSize = 'sm' | 'md' | 'lg';

export interface AsciiGrid {
  cols: number;
  rows: number;
  lines: string[];
}

/** A photo converted to characters at three densities. `aspect` is width / height of the crop. */
export interface AsciiArt {
  id: string;
  aspect: number;
  variants: Record<AsciiSize, AsciiGrid>;
}

export interface AsciiWordmark {
  cols: number;
  lines: string[];
}
