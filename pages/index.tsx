import { FC, useEffect, useState } from 'react';
import Game from '../components/Game';
import GameOver from '../components/GameOver';
import Layout from '../components/Layout';
import Start from '../components/Start';
import track from '../utils/track';

enum Screen {
  Start,
  Game,
  GameOver,
}

const Home: FC = () => {
  const [screen, setScreen] = useState(Screen.Start);
  const [previousScore, setPreviousScore] = useState(0);

  useEffect(() => {
    track({
      event: 'trackEvent',
      eventCategory: 'Navigation',
      eventAction: 'screen',
      eventLabel: Screen[screen],
    });
  }, [screen]);

  const handleStart = () => {
    const audio = new Audio('/sounds/start.mp3');

    audio.play();

    setScreen(Screen.Game);
  };

  const handleGameOver = (score: number) => {
    setPreviousScore(score);
    setScreen(Screen.GameOver);
  };

  return (
    <Layout>
      {screen === Screen.Start && <Start onStart={handleStart} />}
      {screen === Screen.Game && <Game onGameOver={handleGameOver} />}
      {screen === Screen.GameOver && (
        <GameOver onRestart={handleStart} score={previousScore} />
      )}
    </Layout>
  );
};

export default Home;
