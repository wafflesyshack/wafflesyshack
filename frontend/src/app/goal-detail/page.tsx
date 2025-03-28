'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './goalDetail.module.css';
import Image from 'next/image';
import backgroundImage from '../../../public/images/background.jpg';
import GoalCard from '../../../components/GoalCard';
import Calendar from '../../../components/Calendar';

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
  const searchParams = useSearchParams();
  const [stars, setStars] = useState<
    { x: number; y: number; color: string; type: number }[]
  >([]);

  useEffect(() => {
    const achievementRate = searchParams.get('achievementRate');
    const starType = searchParams.get('starType');
    const starColor = searchParams.get('starColor');

    if (achievementRate && starType && starColor) {
      const newStars = [
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          color: starColor,
          type: parseInt(starType),
        },
      ];
      setStars(newStars);
    }
  }, [searchParams]);

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
      {stars.map((star, index) => (
        <Image
          key={index}
          src="/images/star1.png" // 星の画像を表示
          alt="Star"
          width={50} // 画像の幅
          height={50} // 画像の高さ
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            filter: `hue-rotate(${Math.random() * 360}deg)`, // 色相をランダムに変更
          }}
        />
      ))}
      <div className={styles.content}>
        <button
          className={`${styles.toggleButton} ${styles.goalCardToggleButton}`}
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
          className={`${styles.toggleButton} ${styles.calendarToggleButton}`}
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
