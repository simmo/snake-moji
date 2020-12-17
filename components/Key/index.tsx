import { FC, HTMLAttributes } from 'react';
import styles from './styles.module.css';

type Props = HTMLAttributes<HTMLButtonElement>;

const Key: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.base} {...props}>
      <span className={styles.inner}>{children}</span>
    </button>
  );
};

export default Key;
