import React from 'react';
import styles from './StarGetPage.module.css';
import Image from 'next/image';
import backgroundImage from '../public/images/background.jpg';

interface StarGetPageProps {
  achievementRate: number;
  starType: number;
  starLight: string;
  starColor: string;
}

const StarGetPage: React.FC<StarGetPageProps> = ({
  achievementRate,
  starType,
  starLight,
  starColor,
}) => {
  return (
    <div className={styles.starGetPage}>
      <Image
        src={backgroundImage}
        alt="背景画像"
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.content}>
        <h1>星GET!!!</h1>
        <p>達成 % : {achievementRate}%</p>
        <p>星の種類 : {starType}</p>
        <p>明るさ : {starLight}</p>
        <p>色 : {starColor}</p>
      </div>
    </div>
  );
};

export default StarGetPage;
