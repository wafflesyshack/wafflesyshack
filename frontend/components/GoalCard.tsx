import React from 'react';
import styles from './GoalCard.module.css';
import Link from 'next/link';

const GoalCard: React.FC = () => {
  return (
    <div className={styles.goalCard}>
      <div className={styles.goalTitle}>スペイン語</div>
      <Link href="/goal-detail">
        <button className={styles.goalButton}>+ スペイン語1ページ!!</button>
      </Link>
      <div className={styles.goalProgress}>
        <div className={styles.progressItem}>
          連続
          <br />
          8日！
        </div>
        <div className={styles.progressItem}>
          総計
          <br />
          15日！
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
