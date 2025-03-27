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
      position: 'relative',
      height: '100vh',
      backgroundImage: 'url("/images/SL-112421-46970-28.jpg")', // 画像のパスを修正
      backgroundSize: 'cover', // 画像のサイズを調整
      backgroundPosition: 'center', // 画像の位置を中央に設定
    }}
  >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {stars.map((star, index) => (
          <li
            key={index}
            style={{
              position: 'absolute',
              left: `${star.position_x}%`, // X座標を画面幅に基づいて設定
              top: `${star.position_y}%`, // Y座標を画面高さに基づいて設定
              color: star.color,
              fontSize: '24px', // 星のサイズ（必要に応じて調整）
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
