'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; // react-use をインストールしてください
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

const StarGetPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [starColor, setStarColor] = useState('#ffffff');
  const [starType, setStarType] = useState(1);
  const [starLight, setStarLight] = useState('一等星');
  const [achievementRate, setAchievementRate] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // 画面サイズを取得

  useEffect(() => {
    if (achievementRate === 50) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // 5秒後に停止

      return () => clearTimeout(timer); // コンポーネントがアンマウントされたときにタイマーをクリア
    }
  }, [achievementRate]);

  useEffect(() => {
    // クエリパラメータから achievementRate を取得
    const rate = searchParams.get('achievementRate');
    if (rate) {
      setAchievementRate(parseInt(rate));
    }
  }, [searchParams]);

  useEffect(() => {
    // 達成率に基づいて星の種類と明るさを設定
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

    // 星の座標をランダムに生成
    const starPositionX = Math.floor(Math.random() * window.innerWidth);
    const starPositionY = Math.floor(Math.random() * window.innerHeight);

    // バックエンドAPIに星のデータを送信
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
        star_light: starLight,
      }),
    });

    if (response.ok) {
      // 成功した場合、goal-detailページに遷移
      const audio = new Audio('/sounds/キラッ2.mp3'); // 音声ファイルのパスを修正
      audio.play();

      router.push(`/goal-detail/${achievementId}`);
    } else {
      // エラー処理
      console.error('Failed to save star data.');
    }
  };

  return (
    <div className={`${kaiseiOpti.className} ${styles.container}`}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false} // 紙吹雪をリサイクルしない
          numberOfPieces={200} // 紙吹雪の数を調整
        />
      )}
      <div className={styles.card}>
        <h1 className={styles.title}>星GET!!!</h1>
        <p className={styles.info}>達成度: {achievementRate}%</p>
        <p className={styles.info}>星の種類 : {starType}</p>
        <p className={styles.info}>明るさ : {starLight}</p>
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
