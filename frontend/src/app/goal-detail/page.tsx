'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  const params = useParams();
  const achievementId = parseInt(params.id ? String(params.id) : '0');
  const [isGoalCardCollapsed, setIsGoalCardCollapsed] = useState(false);
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);
  const [stars, setStars] = useState<
    { x: number; y: number; color: string; type: number }[]
  >([]);

  useEffect(() => {
    // バックエンドAPIから星のデータを取得
    const fetchStars = async () => {
      const response = await fetch(`/routers/stars/${achievementId}`);
      if (response.ok) {
        const data = await response.json();
        setStars(
          data.stars.map(
            (star: {
              star_type: number;
              star_position_x: number;
              star_position_y: number;
              star_color: string;
              star_light: number;
            }) => ({
              x: star.star_position_x,
              y: star.star_position_y,
              color: star.star_color,
              type: star.star_type,
            })
          )
        );
      } else {
        console.error('Failed to fetch star data.');
      }
    };

    fetchStars();
  }, [achievementId]);

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
      {stars.map((star, index) => {
        let starImage = '/images/star1.png';
        if (star.type === 2) {
          starImage = '/images/star2.png';
        } else if (star.type === 3) {
          starImage = '/images/star3.png';
        }

        return (
          <Image
            key={index}
            src={starImage}
            alt="Star"
            width={50}
            height={50}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              filter: `hue-rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
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
