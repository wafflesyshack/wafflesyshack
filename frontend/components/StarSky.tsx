import React from 'react';

interface StarSkyProps {
  stars: { 
    color: string; // 星の色
    type: string; // 星の種類
    position_x: number; // X座標
    position_y: number; // Y座標
  }[]; 
}

const StarSky: React.FC<StarSkyProps> = ({ stars }) => {
  return (
    <div
      style={{
        position: 'fixed', // 固定してスクロール時にずれないようにする
        top: 0,
        left: 0,
        width: '100vw', // 横幅を100%に
        height: '100vh', // 縦幅を100%に
        backgroundImage: 'url("/images/background.jpg")', // 背景画像
        backgroundSize: 'cover', // 画面全体をカバー
        backgroundPosition: 'center', // 画像を中央配置
        backgroundRepeat: 'no-repeat', // 繰り返しなし
        backgroundAttachment: 'fixed', // スクロールしても背景を固定
        zIndex: -1, // 背景を最背面に配置
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {stars.map((star, index) => (
          <li
            key={index}
            style={{
              position: 'absolute',
              left: `${star.position_x}%`, // X座標
              top: `${star.position_y}%`, // Y座標
              color: star.color,
              fontSize: '24px', // 星のサイズ
            }}
          >
            {star.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarSky;
