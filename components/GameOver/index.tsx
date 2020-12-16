import { FC } from 'react';
import Button from '../Button';
import styles from './styles.module.css';

type Props = { onRestart: () => void; rank?: number; score: number };

const GameOver: FC<Props> = ({ onRestart, rank = 0, score = 0 }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>😢</span>
      <h2 className={styles.heading}>Game Over!</h2>
      <dl className={styles.list}>
        <dt>Score</dt>
        <dd>{score}</dd>
        <dt>Rank</dt>
        <dd>{rank}</dd>
      </dl>
      <Button onClick={onRestart}>Try again</Button>
    </div>
  );
};

export default GameOver;
