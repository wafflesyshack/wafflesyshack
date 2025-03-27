'use client';

import React, { useEffect, useRef } from 'react';
import { Star } from '../src/types/stars';

interface StarDisplayProps {
  stars: Star[];
}

const StarDisplay: React.FC<StarDisplayProps> = ({ stars }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをリサイズ
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 星を描画
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.star_position_x, star.star_position_y, 5, 0, 2 * Math.PI); // 例: 半径5の円
      ctx.fillStyle = star.star_color;
      ctx.fill();
    });
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default StarDisplay;
