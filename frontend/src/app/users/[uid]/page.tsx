'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './home.module.css';
import GoalList from '../../../../components/GoalList';
import CalendarShelf from '../../../../components/CalendarShelf';
import Tutorial from '../../../../components/Tutorial'; // Tutorial コンポーネントのインポート
import Comment from '../../../../components/Comment'; // Comment コンポーネントのインポート

const Home: React.FC = () => {
  const [isGoalListCollapsed, setIsGoalListCollapsed] = useState(false);
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true); // チュートリアルを表示するための状態

  const handleCloseTutorial = () => {
    setShowTutorial(false); // チュートリアルを閉じる
  };

  return (
    <main className={styles.main}>
      {/* 背景画像 */}
      <Image
        src="/images/background.jpg"
        alt="Background Image"
        fill
        className={styles.backgroundImage}
      />

      <div className={styles.content}>
        {/* GoalList */}
        <button
          className={`${styles.toggleButton} ${styles.goalListToggleButton}`}
          onClick={() => setIsGoalListCollapsed(!isGoalListCollapsed)}
        >
          {isGoalListCollapsed ? '▲' : '▼'}
        </button>
        <div
          className={`${styles.goalList} ${
            isGoalListCollapsed ? styles.collapsed : ''
          }`}
        >
          <GoalList />
        </div>

        {/* CalendarShelf */}
        <button
          className={`${styles.toggleButton} ${styles.calendarToggleButton}`}
          onClick={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
        >
          {isCalendarCollapsed ? '▲' : '▼'}
        </button>
        <div
          className={`${styles.calendar} ${
            isCalendarCollapsed ? styles.collapsed : ''
          }`}
        >
          <CalendarShelf />
        </div>
      </div>

      {/* チュートリアルポップアップ */}
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}

      {/* 目標設定吹き出し */}
      <Comment />
    </main>
  );
};

export default Home;
