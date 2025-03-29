"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GoalList.module.css";
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

interface Goal {
  goal_id: number;
  username: string;
  goal_name: string;
  goal_quantity: string;
  start_date: string;
  end_date?: string;
}

export default function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");
        if (response.ok) {
          const data: Goal[] = await response.json();
          setGoals(data);
        } else {
          console.error("目標の取得に失敗しました");
        }
      } catch (error) {
        console.error("目標の取得中にエラーが発生しました:", error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className={styles.goalListContainer}>
      {/* 目標リスト */}
      <div className={styles.header}>
        <h2 className={`${styles.title} ${kaiseiOpti.className}`}>目標</h2>
      </div>
      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => router.push("/goal-set")}
        >
          ＋
        </button>
      </div>
      <div className={styles.goalItems}>
        {goals.map((goal) => (
          <div
            key={goal.goal_id}
            className={styles.goalItem}
            onClick={() => router.push(`/goal/${goal.goal_id}`)}
          >
            {goal.goal_name}
          </div>
        ))}
      </div>
    </div>
  );
}
