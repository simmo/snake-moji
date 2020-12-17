import { FC, useEffect, useRef, useState } from 'react';
import SnakeEngine, { State as GameState } from '../../lib/Game';
import Button from '../Button';
import Board from '../Board';
import styles from './styles.module.css';
import { Direction } from '../../lib/types';
import { Down, Left, Right, Up } from '../Icons';
import Key from '../Key';

type Props = {
  onGameOver: (score: number) => void;
};

const keyToCommandMap = {
  ArrowDown: Direction.Down,
  ArrowUp: Direction.Up,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
};

const Game: FC<Props> = ({ onGameOver }) => {
  const board = useRef<HTMLDivElement>();
  const [state, setState] = useState<GameState>();
  const [countdown, setCountdown] = useState(3);
  const game = useRef<SnakeEngine>();

  // Effect: Initialise game engine
  useEffect(() => {
    game.current = new SnakeEngine({
      onGameOver,
      onRender: setState,
      onScore: (score) => {
        if (score > 0) {
          const audio = new Audio('/sounds/eat.mp3');

          audio.play();
        }
      },
      size: 21,
    });

    return () => {
      game.current.stop();
    };
  }, [onGameOver]);

  // Effect: Execute game commands
  useEffect(() => {
    const handleInput = (event: KeyboardEvent) => {
      const direction = keyToCommandMap[event.code];

      if (direction) {
        event.preventDefault();

        game.current.command(direction);
      } else if (event.code === 'Space') {
        event.preventDefault();

        game.current.isPlaying ? game.current.stop() : game.current.start();
      }
    };

    window.addEventListener('keydown', handleInput);

    return () => {
      window.removeEventListener('keyup', handleInput);
    };
  }, []);

  // Effect: Countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        window.clearTimeout(timer);
      };
    }

    if (countdown === 0) {
      board.current.focus();
      game.current.start();
    }
  }, [countdown]);

  const handleRestart = () => {
    game.current.stop();
    game.current.reset();

    setCountdown(3);
  };

  const handleHelp = () => {
    alert(
      'Press the arrow keys to control the snake, try to eat as many mice (🐭) as you can!\n\nTo pause/resume the game, press space key.'
    );
  };

  const handleDirection = (direction: Direction) => () => {
    game.current.command(direction);
  };

  if (!state) return null;

  return (
    <div>
      <div className={styles.scoreContainer}>
        Score{' '}
        <span className={styles.score}>
          {'0'.repeat(4 - state.score.toString().length)}
          <span className={styles.scoreCurrent}>{state.score}</span>
        </span>
      </div>
      <div className={styles.board} ref={board} tabIndex={-1}>
        <Board
          food={game.current.state.food}
          snake={game.current.state.snake}
          size={21}
        />
        {countdown !== 0 && (
          <span className={styles.countdown}>{countdown}</span>
        )}
      </div>
      <div className={styles.directions}>
        <Key onClick={handleDirection(Direction.Up)}>
          <Up /> Up
        </Key>
        <Key onClick={handleDirection(Direction.Down)}>
          <Down /> Down
        </Key>
        <Key onClick={handleDirection(Direction.Left)}>
          <Left /> Left
        </Key>
        <Key onClick={handleDirection(Direction.Right)}>
          <Right /> Right
        </Key>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleRestart}>Restart</Button>
        <Button onClick={handleHelp}>Help</Button>
      </div>
    </div>
  );
};

export default Game;
