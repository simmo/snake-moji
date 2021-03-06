import Snake from './Snake';
import { Direction, Position } from './types';

export interface State {
  score: number;
  isGameOver: boolean;
  isPlaying: boolean;
  snake: Position[];
  food: Position;
}

interface Config {
  size: number;
  onGameOver?: (score: number) => void;
  onRender?: (state: State) => void;
  onUpdate?: (state: State) => void;
  onScore?: (score: number) => void;
}

export default class Game {
  private raf: ReturnType<typeof window.requestAnimationFrame>;
  private speed = 5;
  private lastTickTime = 0;
  public isGameOver = false;
  public isPlaying = false;
  private score = 0;
  private snake: Snake;
  private food: Position;

  constructor(private readonly config: Config) {
    this.reset();
  }

  private generateRandomPosition() {
    const generateRandomCoord = () =>
      Math.floor(this.config.size * Math.random()) + 1;

    return {
      x: generateRandomCoord(),
      y: generateRandomCoord(),
    };
  }

  private generateFood() {
    let position: Position;

    while (!position || this.snake.isTouching(position)) {
      position = this.generateRandomPosition();
    }

    this.food = position;
  }

  start(): void {
    this.isPlaying = true;
    this.raf = window.requestAnimationFrame(this.tick.bind(this));
  }

  stop(): void {
    this.isPlaying = false;
    window.cancelAnimationFrame(this.raf);
  }

  tick(currentTime: number): void {
    this.raf = window.requestAnimationFrame(this.tick.bind(this));

    const timeDiff = (currentTime - this.lastTickTime) / 1000;

    if (timeDiff < 1 / this.speed) return;

    this.lastTickTime = currentTime;

    this.update();

    this.config.onRender?.(this.state);
  }

  update(): void {
    this.snake.move();

    const [head] = this.snake.body;

    if (this.snake.isTouching(head, false)) {
      this.config.onGameOver?.(this.score);
      this.stop();
      this.reset();
      this.config.onRender(this.state);
    } else if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;

      if (this.score % 100 === 0) {
        this.speed += 0.5;
      }

      this.snake.grow(1);

      this.config.onScore(this.score);

      this.generateFood();
    }
  }

  command(direction: Direction): void {
    if (!this.isPlaying) return;

    this.snake.changeDirection(direction);
  }

  reset(): void {
    const middle = Math.ceil(this.config.size / 2);

    this.snake = new Snake({ x: middle, y: middle }, this.config.size);
    this.isGameOver = false;
    this.score = 0;

    this.generateFood();

    this.config.onRender?.(this.state);
  }

  get state(): State {
    return {
      isGameOver: this.isGameOver,
      isPlaying: this.isPlaying,
      score: this.score,
      snake: this.snake.body,
      food: this.food,
    };
  }
}
