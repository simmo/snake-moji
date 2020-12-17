import { FC, useEffect } from 'react';
import Button from '../Button';
import styles from './styles.module.css';

type Props = {
  onStart: () => void;
};

const Start: FC<Props> = ({ onStart }) => {
  useEffect(() => {
    const audio = new Audio('/sounds/start.mp3');

    audio.play();
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.icon}>🐍</span>
      <h1 className={styles.heading}>Snake-moji</h1>
      <Button onClick={onStart} pulse>
        Start
      </Button>
    </div>
  );
};

export default Start;
