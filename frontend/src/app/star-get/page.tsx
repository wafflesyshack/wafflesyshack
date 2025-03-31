'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const StarGetPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [starColor, setStarColor] = useState('#ffffff');
  const [starType, setStarType] = useState(1);
  const [achievementRate, setAchievementRate] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // クエリパラメータから achievementRate を取得
    const rate = searchParams.get('achievementRate');
    if (rate) {
      setAchievementRate(parseInt(rate));
    }
  }, [searchParams]);

  useEffect(() => {
    if (achievementRate === 50) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievementRate]);

  useEffect(() => {
    const rate = searchParams.get('achievementRate');
    if (rate) {
      setAchievementRate(parseInt(rate));
    }
  }, [searchParams]);

  useEffect(() => {
    if (achievementRate >= 1 && achievementRate <= 49) {
      setStarType(3);
      setStarLight('三等星');
    } else if (achievementRate >= 50 && achievementRate <= 99) {
      setStarType(2);
      setStarLight('二等星');
    } else if (achievementRate === 100) {
      setStarType(1);
      setStarLight('一等星');
    }
  }, [achievementRate]);

  const handleRecord = async () => {
    const achievementId = parseInt(searchParams.get('achievementId') || '0');

    const starPositionX = Math.floor(Math.random() * window.innerWidth);
    const starPositionY = Math.floor(Math.random() * window.innerHeight);

    const response = await fetch(`/routers/stars/${achievementId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        star_type: String(starType),
        star_position_x: String(starPositionX),
        star_position_y: String(starPositionY),
        star_color: starColor,
        star_light: String(starType), // starType を送信
      }),
    });

    if (response.ok) {
      const audio = new Audio('/sounds/キラッ2.mp3');
      audio.play();

      router.push(
        `/goal-detail/${achievementId}?achievementRate=${achievementRate}`
      ); // achievementRate を goal-detail ページに渡す
    } else {
      console.error('Failed to save star data.');
    }
  };

  return (
    <div className={styles.container}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.title}>星GET!!!</h1>
        <p className={styles.info}>達成度: {achievementRate}%</p>
        <p className={styles.info}>星の種類 : {starType}</p>
        <p className={styles.info}>
          明るさ :{' '}
          {starType === 1 ? '一等星' : starType === 2 ? '二等星' : '三等星'}
        </p>
        <label className={styles.label}>
          色 :
          <input
            type="color"
            value={starColor}
            onChange={(e) => setStarColor(e.target.value)}
          />
        </label>
        <button onClick={handleRecord} className={styles.button}>
          入手
        </button>
      </div>
    </div>
  );
};

export default StarGetPage;
