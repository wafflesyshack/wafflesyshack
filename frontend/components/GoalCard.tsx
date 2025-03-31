'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GoalCard.module.css';
import AddGoalModal from './AddGoalModal';
import RecordGoalModal from './RecordGoalModal';

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
  userId: number | undefined; // userId を number | undefined に変更
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
  const closeRecordModal = (newGoal?: {
    id: number;
    name: string;
    link: string;
  }) => {
    if (newGoal) {
      setUserGoals([...userGoals, newGoal]); // 新しい目標を一覧に追加
      setSelectedGoal(newGoal); // 新しい目標を選択状態に設定
    }
    setIsRecordModalOpen(false);
  };

  const handleAddGoal = (goal: { id: number; name: string; link: string }) => {
    setUserGoals([...userGoals, goal]); // 追加された目標を一覧に追加
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
        const response = await fetch(
          `http://localhost:8000/goals/?uid=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserGoals(data.goals);
        } else {
          console.error('目標の取得に失敗しました');
        }
      } catch (error) {
        console.error('目標の取得中にエラーが発生しました:', error);
      }
    };

    if (userId !== undefined) {
      // userId が undefined でない場合のみ fetchUserGoals を実行
      fetchUserGoals();
    } else {
      console.error('userId が設定されていません');
    }
  }, [userId]);

  return (
    <div className={`${styles.goalCard} ${className}`} style={style}>
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
            onClick={() => openRecordModal(goal)}
          >
            {goal.goal_detail} {/* goal_detail を表示 */}
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
            onAdd={handleAddGoal} // handleAddGoal を渡す
            onCancel={closeAddModal}
          />
        </>
      )}
      {isRecordModalOpen && selectedGoal && (
        <>
          <div className={styles.modalOverlay} />
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
