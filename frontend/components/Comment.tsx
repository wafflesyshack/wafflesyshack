'use client';

import { useState, useEffect } from 'react';
import styles from './Comment.module.css'; 
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

const Comment: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // ページロード後に少し遅れて吹き出しを表示
    setTimeout(() => {
      setShowBubble(true);
    }, 2000); // 2秒後に表示
  }, []);

  return (
    <div>
      {/* 吹き出し */}
      <div className={`${styles.bubble} ${kaiseiOpti.className} ${showBubble ? styles.show : ''}`}>
        まずは目標を設定してみよう！
      </div>

      {/* 他のコンテンツ */}
      {/* ここに目標設定フォームなどを置けます */}
    </div>
  );
};

export default Comment;
