'use client';

import React, { useState } from 'react';
import { Star } from '../src/types/stars';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  onStarCreated: (star: Star) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onStarCreated }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [color, setColor] = useState('#ffffff'); // デフォルトは白

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStar: Star = {
      id: uuidv4(),
      star_type: '通常星', // 例: 通常星
      star_position_x: Math.random() * window.innerWidth, // ランダムなX座標
      star_position_y: Math.random() * window.innerHeight, // ランダムなY座標
      star_color: color,
      star_light: Math.random() * 100, // 0から100のランダムな明るさ
    };

    onStarCreated(newStar);

    // フォームをリセット
    setTitle('');
    setAmount('');
    setUnit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">目標量</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="unit">目標単位</label>
        <input
          type="text"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="color">星の色</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <button type="submit">作成する</button>
    </form>
  );
};

export default TaskForm;
