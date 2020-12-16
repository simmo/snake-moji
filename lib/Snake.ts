import { Direction, Position } from './types';

enum SegmentType {
  Head,
  Tail,
  Turn,
  Body,
}

interface Segment extends Position {
  direction: Direction;
  type: SegmentType;
}

export default class Snake {
  public body: Segment[];
  private direction: Direction = Direction.Right;
  private growthQueue = 0;

  constructor(position: Position) {
    this.body = [
      {
        x: position.x + 1,
        y: position.y,
        direction: Direction.None,
        type: SegmentType.Head,
      },
      {
        x: position.x,
        y: position.y,
        direction: Direction.None,
        type: SegmentType.Body,
      },
      {
        x: position.x - 1,
        y: position.y,
        direction: Direction.None,
        type: SegmentType.Tail,
      },
    ];
  }

  changeDirection(direction: Direction): void {
    const currentAxisVertical = this.direction & Direction.Vertical;
    const newAxisVertical = direction & Direction.Vertical;

    if (
      this.direction !== Direction.None &&
      !!currentAxisVertical === !!newAxisVertical
    )
      return;

    this.direction = direction;
  }

  move(): void {
    if (this.direction === Direction.None) return;

    if (this.growthQueue > 0) {
      for (let i = 0; i < this.growthQueue; i++) {
        this.body.push({ ...this.body[this.body.length - 1] });
      }
    }

    this.growthQueue = 0;

    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }

    switch (this.direction) {
      case Direction.Up:
        this.body[0].y -= 1;
        break;
      case Direction.Down:
        this.body[0].y += 1;
        break;
      case Direction.Left:
        this.body[0].x -= 1;
        break;
      case Direction.Right:
        this.body[0].x += 1;
        break;
    }
  }

  grow(amount: number): void {
    this.growthQueue += amount;
  }

  isTouching(position: Position, includeHead = true, log = false): boolean {
    return this.body.some((segment, index) => {
      if (index === 0 && !includeHead) return false;

      if (log) {
        console.log(index, segment, position);
      }

      return segment.x === position.x && segment.y === position.y;
    });
  }
}
