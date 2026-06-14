export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  Right,
  Left,
  Up,
  Down,
}

export interface SnakeProps {
  snake: Coordinate[];
}
