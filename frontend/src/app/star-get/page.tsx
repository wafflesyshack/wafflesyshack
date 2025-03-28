'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const StarGetPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [starColor, setStarColor] = useState('#ffffff');

  const getStarData = async () => {
    return {
      achievementRate: 80,
      starType: 1,
      starLight: '一等星',
    };
  };

  const handleRecord = async () => {
    const starData = await getStarData();
    const achievementId = parseInt(searchParams.get('achievementId') || '0'); // achievementIdを取得

    // 星の座標をランダムに生成
    const starPositionX = Math.floor(Math.random() * window.innerWidth);
    const starPositionY = Math.floor(Math.random() * window.innerHeight);

    // バックエンドAPIに星のデータを送信
    const response = await fetch(`/reuters/star_post/${achievementId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        star_type: String(starData.starType),
        star_position_x: String(starPositionX),
        star_position_y: String(starPositionY),
        star_color: starColor,
        star_light: String(starData.starLight),
      }),
    });

    if (response.ok) {
      // 成功した場合、goal-detailページに遷移
      router.push(`/goal-detail/${achievementId}`);
    } else {
      // エラー処理
      console.error('Failed to save star data.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>星GET!!!</h1>
        <p className={styles.info}>達成% : 80%</p>
        <p className={styles.info}>星の種類 : 1</p>
        <p className={styles.info}>明るさ : 一等星</p>
        <label>
          色 :
          <input
            type="color"
            value={starColor}
            onChange={(e) => setStarColor(e.target.value)}
          />
        </label>
        <button onClick={handleRecord}>記録</button>
      </div>
    </div>
  );
};

export default StarGetPage;
