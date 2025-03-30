'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import styles from './goalDetail.module.css';
import Image from 'next/image';
import backgroundImage from '../../../../public/images/background.jpg';
import GoalCard from '../../../../components/GoalCard';
import Calendar from '../../../../components/Calendar';

interface Topic {
  topic_id: number;
  uid: string;
  topic_name: string;
  start_date: string;
  end_date?: string;
}

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
  const topicId = params.topicId as string;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const [isGoalCardCollapsed, setIsGoalCardCollapsed] = useState(false);
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);
  const [stars, setStars] = useState<
    { x: number; y: number; color: string; type: number }[]
  >([]);

  useEffect(() => {
    const fetchTopic = async () => {
      if (topicId) {
        try {
          const response = await fetch(
            `http://localhost:8000/topics/${topicId}`
          );
          if (response.ok) {
            const data: Topic = await response.json();
            setTopic(data);
          } else {
            console.error('目標トピックの取得に失敗しました');
          }
        } catch (error) {
          console.error('目標トピックの取得中にエラーが発生しました:', error);
        }

        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  const toggleGoalCardCollapse = () => {
    setIsGoalCardCollapsed(!isGoalCardCollapsed);
  };

  const toggleCalendarCollapse = () => {
    setIsCalendarCollapsed(!isCalendarCollapsed);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!topic) {
    return <div>目標トピックが見つかりませんでした</div>;
  }

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
          goalName={topic.topic_name}
          goalData={goalData}
          continuousDays={goalData.continuousDays}
          totalDays={goalData.totalDays}
          className={isGoalCardCollapsed ? styles['goalCard.collapsed'] : ''}
          style={{
            maxHeight: isGoalCardCollapsed ? '0' : '500px',
            opacity: isGoalCardCollapsed ? '0' : '1',
            overflow: 'hidden',
          }}
          userId={uid ? parseInt(uid) : 0} // uid を props として渡す
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
