import React, { useState } from 'react';
import styles from './GoalCard.module.css';

interface GoalData {
  goalName: string;
  goals: { id: number; name: string; link: string }[];
  continuousDays: number;
  totalDays: number;
}

interface GoalCardProps {
  goalData: GoalData;
  className?: string;
  style?: React.CSSProperties;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalData, className, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalDetail, setGoalDetail] = useState('');
  const [goalQuantity, setGoalQuantity] = useState(0);
  const [goalUnit, setGoalUnit] = useState('ページ');
  const [localGoals, setLocalGoals] = useState(goalData.goals);
  const [activeTab, setActiveTab] = useState('追加');
  const [selectedGoal, setSelectedGoal] = useState<{
    id: number;
    name: string;
    link: string;
  } | null>(null);

  const openModal = (goal?: { id: number; name: string; link: string }) => {
    if (goal) {
      setSelectedGoal(goal);
      setActiveTab('記録');
    } else {
      setSelectedGoal(null);
      setActiveTab('追加');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleGoalDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalDetail(e.target.value);
  };

  const handleGoalQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalQuantity(parseInt(e.target.value));
  };

  const handleGoalUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGoalUnit(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedGoal) {
      console.log('記録:', goalDetail, goalQuantity, goalUnit);
    } else {
      setLocalGoals([
        ...localGoals,
        {
          id: Date.now(),
          name: `${goalDetail} (${goalQuantity} ${goalUnit})`,
          link: `/goal-detail/${Date.now()}`,
        },
      ]);
    }
    closeModal();
  };

  return (
    <div className={`${styles.goalCard} ${className}`} style={style}>
      <div className={styles.goalTitle}>
        {goalData.goalName}
        <button className={styles.addButton} onClick={() => openModal()}>
          +
        </button>
      </div>
      <div className={styles.goalButtons}>
        {localGoals.map((goal) => (
          <button
            key={goal.id}
            className={styles.goalButton}
            onClick={() => openModal(goal)}
          >
            {goal.name}
          </button>
        ))}
      </div>
      <div className={styles.goalProgress}>
        <div className={styles.progressItem}>
          連続
          <br />
          {goalData.continuousDays}日
        </div>
        <div className={styles.progressItem}>
          総計
          <br />
          {goalData.totalDays}日
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalTabs}>
              <button
                className={activeTab === '追加' ? styles.activeTab : ''}
                onClick={() => setActiveTab('追加')}
              >
                追加
              </button>
              <button
                className={activeTab === '記録' ? styles.activeTab : ''}
                onClick={() => setActiveTab('記録')}
              >
                記録
              </button>
            </div>

            {activeTab === '追加' && (
              <div>
                <h2>目標追加</h2>
                <label>
                  目標詳細:
                  <input
                    type="text"
                    value={goalDetail}
                    onChange={handleGoalDetailChange}
                  />
                </label>
                <label>
                  目標量:
                  <input
                    type="number"
                    value={goalQuantity}
                    onChange={handleGoalQuantityChange}
                  />
                </label>
                <label>
                  単位:
                  <select value={goalUnit} onChange={handleGoalUnitChange}>
                    <option value="ページ">ページ</option>
                    <option value="時間">時間</option>
                    <option value="回数">回数</option>
                  </select>
                </label>
                <div className={styles.modalButtons}>
                  <button onClick={handleSubmit}>追加</button>
                  <button onClick={closeModal}>キャンセル</button>
                </div>
              </div>
            )}

            {activeTab === '記録' && (
              <div>
                <h2>記録</h2>
                <label>
                  目標詳細:
                  <input
                    type="text"
                    value={goalDetail}
                    onChange={handleGoalDetailChange}
                  />
                </label>
                <label>
                  目標量:
                  <input
                    type="number"
                    value={goalQuantity}
                    onChange={handleGoalQuantityChange}
                  />
                </label>
                <label>
                  単位:
                  <select value={goalUnit} onChange={handleGoalUnitChange}>
                    <option value="ページ">ページ</option>
                    <option value="時間">時間</option>
                    <option value="回数">回数</option>
                  </select>
                </label>
                <div className={styles.modalButtons}>
                  <button onClick={handleSubmit}>記録</button>
                  <button onClick={closeModal}>キャンセル</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
