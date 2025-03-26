'use client';

import React, { useState } from 'react';
import styles from './goalDetail.module.css';
import Image from 'next/image';
import backgroundImage from '../../../public/images/background.jpg';
import GoalCard from '../../../components/GoalCard';
import Calendar from '../../../components/Calender';

const goalData = {
  goalName: 'スペイン語',
  goals: [
    {
      id: 1,
      name: 'スペイン語1ページ!!',
      link: '/goal-detail/1',
    },
    {
      id: 2,
      name: 'スペイン語単語帳',
      link: '/goal-detail/2',
    },
  ],
  continuousDays: 8,
  totalDays: 15,
};

const GoalDetail: React.FC = () => {
  const [isGoalCardCollapsed, setIsGoalCardCollapsed] = useState(false);
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);

  const toggleGoalCardCollapse = () => {
    setIsGoalCardCollapsed(!isGoalCardCollapsed);
  };

  const toggleCalendarCollapse = () => {
    setIsCalendarCollapsed(!isCalendarCollapsed);
  };

  return (
    <main className={styles.main}>
      <Image
        src={backgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <button
          className={`${styles.toggleButton} ${styles.goalCardToggleButton}`} // クラス名を変更
          onClick={toggleGoalCardCollapse}
        >
          {isGoalCardCollapsed ? '▲' : '▼'}
        </button>
        <GoalCard
          goalData={goalData}
          className={isGoalCardCollapsed ? styles['goalCard.collapsed'] : ''}
          style={{
            maxHeight: isGoalCardCollapsed ? '0' : '500px',
            opacity: isGoalCardCollapsed ? '0' : '1',
            overflow: 'hidden',
          }}
        />
        <button
          className={`${styles.toggleButton} ${styles.calendarToggleButton}`} // クラス名を変更
          onClick={toggleCalendarCollapse}
        >
          {isCalendarCollapsed ? '▲' : '▼'}
        </button>
        <Calendar
          className={isCalendarCollapsed ? styles['calendar.collapsed'] : ''}
          style={{
            maxHeight: isCalendarCollapsed ? '0' : '500px',
            opacity: isCalendarCollapsed ? '0' : '1',
            overflow: 'hidden',
          }}
        />
      </div>
    </main>
  );
};

export default GoalDetail;
