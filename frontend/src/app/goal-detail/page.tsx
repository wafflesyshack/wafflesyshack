'use client';

import React from 'react';
import styles from './goalDetail.module.css';
import Image from 'next/image';
import backgroundImage from '../../../public/images/background.jpg';
import GoalCard from '../../../components/GoalCard';
import Calendar from '../../../components/Calender';

const GoalDetail: React.FC = () => {
  return (
    <main className={styles.main}>
      <Image
        src={backgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <GoalCard />
        <Calendar />
      </div>
    </main>
  );
};

export default GoalDetail;
