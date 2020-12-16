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

  constructor(position: Position, private readonly size: number) {
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
        if (this.body[0].y > 0) {
          this.body[0].y -= 1;
        } else {
          this.body[0].y = this.size;
        }
        break;
      case Direction.Down:
        if (this.body[0].y <= this.size) {
          this.body[0].y += 1;
        } else {
          this.body[0].y = 0;
        }
        break;
      case Direction.Left:
        if (this.body[0].x > 0) {
          this.body[0].x -= 1;
        } else {
          this.body[0].x = this.size;
        }
        break;
      case Direction.Right:
        if (this.body[0].x <= this.size) {
          this.body[0].x += 1;
        } else {
          this.body[0].x = 1;
        }
        break;
    }
  }

  grow(amount: number): void {
    this.growthQueue += amount;
  }

  isTouching(position: Position, includeHead = true): boolean {
    return this.body.some((segment, index) => {
      if (index === 0 && !includeHead) return false;

      return segment.x === position.x && segment.y === position.y;
    });
  }
}
