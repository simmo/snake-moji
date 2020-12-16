import { FC } from 'react';
import { Position } from '../../lib/types';

import styles from './styles.module.css';

type Props = { position: Position };

const Food: FC<Props> = ({ position }) => {
  return (
    <div
      className={styles.base}
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    >
      <span className={styles.inner}>🐭</span>
    </div>
  );
};

export default Food;
