"use client";
import { useEffect } from 'react';
import AuthTabs from '../../../components/AuthTab';
import styles from './login.module.css'; // スタイルをインポート

const AuthPage = () => {
    useEffect(() => {
      // 流れ星をランダムに生成
      const createStars = () => {
        const numStars = 20; // 生成する流れ星の数
        const container = document.querySelector(`.${styles.container}`);
    
        if (container) { // nullチェック
          for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add(styles.star);
            container.appendChild(star);
    
            // ランダムに流れ星の位置を設定
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.animationDuration = `${Math.random() * 2 + 1}s`; // ランダムなスピード
          }
        }
      };

    createStars();

    // クリーンアップ: コンポーネントがアンマウントされるときに流れ星を削除
    return () => {
      const stars = document.querySelectorAll(`.${styles.star}`);
      stars.forEach((star) => star.remove());
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* スタイルを適用 */}
      <AuthTabs />
    </div>
  );
};

export default AuthPage;
