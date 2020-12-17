import { FC } from 'react';
import styles from './styles.module.css';
import Food from '../Food';
import Snake from '../Snake';
import { Position } from '../../lib/types';

type Props = { food: Position; size: number; snake: Position[] };

const Board: FC<Props> = ({ food, size, snake }) => {
  const gridCells = `repeat(${size}, 1fr)`;

  return (
    <div className={styles.board}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: gridCells,
          gridTemplateRows: gridCells,
        }}
      >
        <Snake segments={snake} />
        <Food position={food} />
      </div>
    </div>
  );
};

export default Board;
