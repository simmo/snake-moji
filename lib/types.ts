export enum Direction {
  None = 0,
  Left = 2,
  Right = 4,
  Up = 8,
  Down = 16,
  Horizontal = 6,
  Vertical = 24,
}

export interface Position {
  x: number;
  y: number;
}
