import { FC, Fragment } from 'react';
import type { Position } from '../../lib/types';
import styles from './styles.module.css';

type Props = { segments: Position[] };

const Snake: FC<Props> = ({ segments }) => {
  return (
    <Fragment>
      {segments.map((segment, index) => (
        <div
          className={index === 0 ? styles.head : styles.body}
          key={index}
          style={{
            gridColumnStart: segment.x,
            gridRowStart: segment.y,
          }}
        />
      ))}
    </Fragment>
  );
};

export default Snake;
