'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterをインポート
import styles from './GoalCard.module.css';
import AddGoalModal from './AddGoalModal';
import RecordGoalModal from './RecordGoalModal';
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [localGoals, setLocalGoals] = useState(goalData.goals);
  const [selectedGoal, setSelectedGoal] = useState<{
    id: number;
    name: string;
    link: string;
  } | null>(null);

  const router = useRouter();

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openRecordModal = (goal: {
    id: number;
    name: string;
    link: string;
  }) => {
    setSelectedGoal(goal);
    setIsRecordModalOpen(true);
  };
  const closeRecordModal = () => setIsRecordModalOpen(false);

  const handleAddGoal = (goal: { id: number; name: string; link: string }) => {
    setLocalGoals([...localGoals, goal]);
    closeAddModal();
  };

  // 記録ボタンが押された時の処理（goalButton の記録ボタンのみ）
  const handleRecordGoal = (rate: number) => {
    console.log(`達成率: ${rate}%`);
    router.push('/star-get');
    closeRecordModal();
  };

  return (
    <div className={`${styles.goalCard} ${className} ${kaiseiOpti.className}`} style={style}>
      <div className={styles.goalTitle}>
        <div className={styles.goalName}>{goalData.goalName}</div>
        <button className={styles.addButton} onClick={openAddModal}>
          +
        </button>
      </div>

      <div className={styles.goalButtons}>
        {localGoals.map((goal) => (
          <button
            key={goal.id}
            className={styles.goalButton}
            onClick={() => openRecordModal(goal)}
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

      {isAddModalOpen && (
        <>
          <div className={styles.modalOverlay} />{' '}
          {/* カレンダーを暗くする背景 */}
          <AddGoalModal onAdd={handleAddGoal} onCancel={closeAddModal} />
        </>
      )}
      {isRecordModalOpen && selectedGoal && (
        <>
          <div className={styles.modalOverlay} />{' '}
          {/* カレンダーを暗くする背景 */}
          <RecordGoalModal
            goal={selectedGoal}
            onRecord={handleRecordGoal}
            onCancel={closeRecordModal}
          />
        </>
      )}
    </div>
  );
};

export default GoalCard;
