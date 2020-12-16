import { FC } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';

const Layout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snake Game - Mike Simmonds</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        Made by <a href="https://mike.id">Mike</a>
      </footer>
    </div>
  );
};

export default Layout;
