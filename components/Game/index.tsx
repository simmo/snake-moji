import { FC, useEffect, useRef, useState } from 'react';
import SnakeEngine, { State as GameState } from '../../lib/Game';
import Button from '../Button';
import Board from '../Board';
import styles from './styles.module.css';
import { Direction } from '../../lib/types';

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

        console.log('play/pause');
        game.current.isPlaying ? game.current.stop() : game.current.start();
      }
    };

    window.addEventListener('keydown', handleInput);

    return () => {
      window.removeEventListener('keyup', handleInput);
    };
  }, []);

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

  if (!state) return null;

  return (
    <div className={styles.container}>
      <div className={styles.scoreContainer}>
        Score{' '}
        <span className={styles.score}>
          {'0'.repeat(4 - state.score.toString().length)}
          <span className={styles.scoreCurrent}>{state.score}</span>
        </span>
      </div>
      <div className={styles.board} ref={board}>
        <Board
          food={game.current.state.food}
          snake={game.current.state.snake}
          size={21}
        />
        {countdown !== 0 && (
          <span className={styles.countdown}>
            <span className={styles.countdownInner}>{countdown}</span>
          </span>
        )}
      </div>
      <div className={styles.actions}>
        <Button onClick={handleRestart}>Restart</Button>
        <Button onClick={handleHelp}>Help</Button>
      </div>
    </div>
  );
};

export default Game;
