import React, { useState } from 'react';
import styles from './GoalCard.module.css';

interface AddGoalModalProps {
  onAdd: (goal: { id: number; name: string; link: string }) => void;
  onCancel: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ onAdd, onCancel }) => {
  const [goalDetail, setGoalDetail] = useState('');
  const [goalQuantity, setGoalQuantity] = useState(0);
  const [goalUnit, setGoalUnit] = useState('ページ');

  const handleSubmit = () => {
    onAdd({
      id: Date.now(),
      name: `${goalDetail} (${goalQuantity} ${goalUnit})`,
      link: `/goal-detail/${Date.now()}`,
    });
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
