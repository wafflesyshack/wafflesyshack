'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  goalName: string;
  goals: { id: number; name: string; link: string }[];
  continuousDays: number;
  totalDays: number;
  className?: string;
  style?: React.CSSProperties;
  goalData: GoalData;
  userId: string | undefined; // userId を string | undefined に変更
}

const GoalCard: React.FC<GoalCardProps> = ({
  goalName,
  goals,
  continuousDays,
  totalDays,
  className,
  style,
  goalData,
  userId,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [localGoals, setLocalGoals] = useState(goalData.goals);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null); // selectedGoal を number | null に変更

  const router = useRouter();

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openRecordModal = (goalId: number) => {
    setSelectedGoal(goalId);
    setIsRecordModalOpen(true);
  };

  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
  };

  const handleAddGoal = (goal: {
    id: number;
    name: string;
    link: string;
    goal_detail: string;
    goal_unit: string;
    goal_name: string;
  }) => {
    setUserGoals([...userGoals, goal]);
    closeAddModal();
  };

  const handleRecordGoal = (rate: number) => {
    console.log(`達成率: ${rate}%`);
    router.push('/star-get');
    closeRecordModal();
  };

  const [userGoals, setUserGoals] = useState<
    {
      id: number;
      name: string;
      link: string;
      goal_detail: string;
      goal_unit: string;
      goal_name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:8000/goals/?uid=${userId}` // userId が undefined でないことを確認
          );
          if (response.ok) {
            const data = await response.json();
            setUserGoals(data.goals);
          } else {
            console.error('目標の取得に失敗しました');
          }
        } else {
          console.error('userId が設定されていません');
        }
      } catch (error) {
        console.error('目標の取得中にエラーが発生しました:', error);
      }
    };

    fetchUserGoals();
  }, [userId]);

  return (
    <div className={`${styles.goalCard} ${className} ${kaiseiOpti.className}`} style={style}>
      <div className={styles.goalTitle}>
        <div className={styles.goalName}>{goalName}</div>
        <button className={styles.addButton} onClick={openAddModal}>
          +
        </button>
      </div>

      <div className={styles.goalButtons}>
        {userGoals.map((goal) => (
          <button
            key={goal.id}
            className={styles.goalButton}
            onClick={() => openRecordModal(goal.id)}
          >
            {goal.goal_name}
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
          <div className={styles.modalOverlay} />
          <AddGoalModal
            userId={userId}
            onAdd={handleAddGoal}
            onCancel={closeAddModal}
          />
        </>
      )}

      {isRecordModalOpen && selectedGoal && (
        <>
          <div className={styles.modalOverlay} />
          <RecordGoalModal
            goalId={selectedGoal}
            userId={userId} // userId を渡す
            onRecord={handleRecordGoal}
            onCancel={closeRecordModal}
          />
        </>
      )}
    </div>
  );
};

export default GoalCard;
