"use client";

import { useEffect, useState } from "react";
import GoalList from "../../../components/GoalList";
import CalendarShelf from "../../../components/CalendarShelf";
import StarSky from "../../../components/StarSky";
import styles from './home.module.css';

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [goalsRes, calendarRes, starsRes] = await Promise.all([
        fetch("/api/goals"),
        fetch("/api/calendar"),
        fetch("/api/stars"),
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
      console.error("データ取得エラー:", error);
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
            <CalendarShelf data={calendarData} /> {/* calendarDataをCalendarに渡す */}
          </div>
        </div>
      </div>
    </div>
  );
}
