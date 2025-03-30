'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './home.module.css';
import GoalList from '../../../../components/GoalList';
import CalendarShelf from '../../../../components/CalendarShelf';
import Tutorial from '../../../../components/Tutorial';
import Comment from '../../../../components/Comment';
import { useSearchParams } from 'next/navigation';

const Home: React.FC = () => {
  const [isGoalListCollapsed, setIsGoalListCollapsed] = useState(false);
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const searchParams = useSearchParams();
  const topicName = searchParams.get('topicName') as string | undefined; // string | undefined 型にキャスト
  const startDate = searchParams.get('startDate') as string | undefined; // string | undefined 型にキャスト
  const endDate = searchParams.get('endDate') as string | undefined; // string | undefined 型にキャスト

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <main className={styles.main}>
      <Image
        src="/images/background.jpg"
        alt="Background Image"
        fill
        className={styles.backgroundImage}
      />

      <div className={styles.content}>
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
          <GoalList
            topicName={topicName}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

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

      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}

      <Comment />
    </main>
  );
};

export default Home;
