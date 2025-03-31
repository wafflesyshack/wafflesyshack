'use client';

import React, { useState, useEffect } from 'react';
import styles from './GoalCard.module.css';
import { useRouter } from 'next/navigation';
import router from 'next/router';

interface RecordGoalModalProps {
  goalId: number;
  userId: string | undefined; // userId を props として受け取る
  onRecord: (rate: number) => void;
  onCancel: () => void;
}

const RecordGoalModal: React.FC<RecordGoalModalProps> = ({
  goalId,
  userId, // userId を props として受け取る
  onRecord,
  onCancel,
}) => {
  const [goalDetail, setGoalDetail] = useState('');
  const [goalQuantity, setGoalQuantity] = useState(0);
  const [goalUnit, setGoalUnit] = useState('ページ');
  const [maxGoalQuantity, setMaxGoalQuantity] = useState(0);
  const [achievementRate, setAchievementRate] = useState(0);
  const router = useRouter(); // router を初期化

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:8000/goals/${goalId}?uid=${userId}` // uid をクエリパラメータに追加
          );
          if (response.ok) {
            const data = await response.json();
            setGoalDetail(data.goal_detail);
            setMaxGoalQuantity(data.goal_quantity);
            setGoalUnit(data.goal_unit);
          } else {
            console.error('Failed to fetch goal details:', response.statusText);
          }
        } else {
          console.error('userId が設定されていません');
        }
      } catch (error) {
        console.error('Error fetching goal details:', error);
      }
    };

    fetchGoalDetails();
  }, [goalId, userId]);

  useEffect(() => {
    if (maxGoalQuantity > 0) {
      setAchievementRate((goalQuantity / maxGoalQuantity) * 100);
    }
  }, [goalQuantity, maxGoalQuantity]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/achievements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal_id: goalId,
          achievement_quantity: goalQuantity,
          achievement_detail: goalDetail,
        }),
      });
      if (response.ok) {
        router.push(`/star-get?achievementRate=${achievementRate}`); // 達成度を渡す
      } else {
        console.error('Failed to save achievement:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onCancel}>
          ×
        </button>
        <h2>記録</h2>
        <label>
          目標詳細:
          <input type="text" value={goalDetail} disabled />
        </label>
        <label>
          達成量:
          <input
            type="number"
            value={goalQuantity}
            onChange={(e) => setGoalQuantity(parseInt(e.target.value))}
          />
        </label>
        <label>
          単位:
          {goalUnit}
        </label>
        <div className={styles.modalButtons}>
          <button onClick={handleSubmit}>記録</button>
          <button
            onClick={onCancel}
            style={{
              color: goalQuantity > maxGoalQuantity ? 'red' : 'inherit',
            }}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordGoalModal;
