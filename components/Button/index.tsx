import { FC, HTMLAttributes } from 'react';

import styles from './styles.module.css';

type Props = { pulse?: boolean } & HTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, pulse = false, ...props }) => {
  return (
    <button
      className={`${styles.base} ${pulse ? styles.pulse : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
