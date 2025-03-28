'use client';

import React, { useState, useEffect } from 'react';
import styles from './GoalCard.module.css';

interface RecordGoalModalProps {
  goal: { id: number; name: string; link: string };
  onRecord: (rate: number) => void;
  onCancel: () => void;
}

const RecordGoalModal: React.FC<RecordGoalModalProps> = ({
  goal,
  onRecord,
  onCancel,
}) => {
  const [goalQuantity, setGoalQuantity] = useState(0);
  const [goalUnit, setGoalUnit] = useState('ページ');
  const [hasInput, setHasInput] = useState(false);

  useEffect(() => {
    setHasInput(goalQuantity !== 0);
  }, [goalQuantity]);

  const handleSubmit = () => {
    const rate = (goalQuantity / 100) * 100;
    onRecord(rate);
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
          <input type="text" value={goal.name} disabled />
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
          <button onClick={handleSubmit}>記録</button>
          <button
            onClick={onCancel}
            style={{ color: hasInput ? 'red' : 'inherit' }}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordGoalModal;
