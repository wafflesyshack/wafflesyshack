'use client';

import { useEffect, useState } from 'react';
import GoalList from '../../../components/GoalList';
import CalendarShelf from '../../../components/CalendarShelf';
import StarSky from '../../../components/StarSky';
import styles from './home.module.css';
import { auth } from '../../../libs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [stars, setStars] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  const fetchData = async (uid: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error('認証されていません');
      }

      const [goalsRes, calendarRes, starsRes] = await Promise.all([
        fetch(`/api/goals/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/calendar/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/stars/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [goalsData, calendarData, starsData] = await Promise.all([
        goalsRes.json(),
        calendarRes.json(),
        starsRes.json(),
      ]);

      setGoals(goalsData);
      setCalendarData(calendarData);
      setStars(starsData);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  return (
    <div className="relative h-screen">
      {/* 星空背景 */}
      <StarSky stars={stars} />

      {/* コンテンツ部分（目標リストとカレンダー） */}
      <div className="absolute bottom-0 left-0 w-full p-2 z-10">
        <div className="flex justify-between gap-6">
          {/* 目標リスト（左下） */}
          <div className="w-full sm:w-1/2 lg:w-3/4 p-2">
            <GoalList goals={goals} /> {/* goalsをGoalListに渡す */}
          </div>

          {/* カレンダー（右下） */}
          <div className="w-full sm:w-1/2 lg:w-3/4 p-2">
            <CalendarShelf data={calendarData} />{' '}
            {/* calendarDataをCalendarに渡す */}
          </div>
        </div>
      </div>
    </div>
  );
}
