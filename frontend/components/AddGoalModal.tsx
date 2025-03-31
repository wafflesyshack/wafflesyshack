'use client';

import React, { useState } from 'react';
import styles from './GoalCard.module.css';

interface AddGoalModalProps {
  onAdd: (goal: { id: number; name: string; link: string }) => void;
  onCancel: () => void;
  userId: number;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  onAdd,
  onCancel,
  userId,
}) => {
  const [goalDetail, setGoalDetail] = useState('');
  const [goalQuantity, setGoalQuantity] = useState(0);
  const [goalUnit, setGoalUnit] = useState('ページ');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/goals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          uid: userId.toString(),
          goal_name: `<span class="math-inline">\{goalDetail\} \(</span>{goalQuantity} ${goalUnit})`,
          topic_id: '1',
          goal_quantity: goalQuantity.toString(),
          goal_detail: goalDetail,
          start_date: new Date().toISOString().split('T')[0],
          end_date: new Date().toISOString().split('T')[0],
          goal_unit: goalUnit,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // 親コンポーネントに新しい目標データを渡す
        onAdd({
          id: data.goal_id,
          name: data.goal_name,
          link: `/goal-detail/${data.goal_id}`,
        });
        // モーダルを閉じる
        onCancel();
      } else {
        console.error('Failed to add goal:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>目標追加</h2>
        <label>
          目標詳細:
          <input
            type="text"
            value={goalDetail}
            onChange={(e) => setGoalDetail(e.target.value)}
          />
        </label>
        <label>
          目標量:
          <input
            type="number"
            value={goalQuantity}
            onChange={(e) => setGoalQuantity(parseInt(e.target.value))}
          />
        </label>
        <label>
          単位:
          <select
            value={goalUnit}
            onChange={(e) => setGoalUnit(e.target.value)}
          >
            <option value="ページ">ページ</option>
            <option value="時間">時間</option>
            <option value="回数">回数</option>
          </select>
        </label>
        <div className={styles.modalButtons}>
          <button onClick={handleSubmit}>追加</button>
          <button onClick={onCancel}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
