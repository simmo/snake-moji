import { FC } from 'react';
import styles from './styles.module.css';

type Props = { color?: string };

export const Down: FC<Props> = ({ color = 'currentColor' }) => (
  <svg className={styles.base} viewBox="0 0 512 512">
    <path
      d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
      fill={color}
    />
  </svg>
);
export const Up: FC<Props> = ({ color = 'currentColor' }) => (
  <svg className={styles.base} viewBox="0 0 512 512">
    <path
      d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
      fill={color}
    />
  </svg>
);
export const Left: FC<Props> = ({ color = 'currentColor' }) => (
  <svg className={styles.base} viewBox="0 0 512 512">
    <path
      d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"
      fill={color}
    />
  </svg>
);
export const Right: FC<Props> = ({ color = 'currentColor' }) => (
  <svg className={styles.base} viewBox="0 0 512 512">
    <path
      d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"
      fill={color}
    />
  </svg>
);
