import React from "react";
import styles from "./Tutorial.module.css"; // スタイルのインポート
import { Kaisei_Opti } from 'next/font/google';

interface TutorialProps {
  onClose: () => void;
}
const kaiseiOpti = Kaisei_Opti({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${kaiseiOpti.className}`}>
        <h2>ようこそ</h2>
        <p>
          このアプリでは、目標を達成するたびに星が空に追加されます！目標を設定して、達成するたびに星空を輝かせていきましょう。
        </p>
        <button onClick={onClose} className={styles["close-button"]}> {/* 修正されたクラス名 */}
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
