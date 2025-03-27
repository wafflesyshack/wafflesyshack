'use client';

import React, { useState } from 'react';
import { Star } from '../types/star';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  onStarCreated: (star: Star) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onStarCreated }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [achievedAmount, setAchievedAmount] = useState('');
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const achievementRate = (Number(achievedAmount) / Number(amount)) * 100;

    let starType = 0; // バックエンドの型に合わせて整数値を使用
    let starLight = 0;

    if (achievementRate >= 1 && achievementRate <= 49) {
      starType = 3; // 三等星
      starLight = 50;
    } else if (achievementRate >= 50 && achievementRate <= 99) {
      starType = 2; // 二等星
      starLight = 75;
    } else if (achievementRate === 100) {
      starType = 1; // 一等星
      starLight = 100;
    }

    if (starType !== 0) {
      try {
        const response = await fetch(`http://localhost:8000/star_post/1`, {
          // achievement_id は仮に 1
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            star_type: starType.toString(),
            star_position_x: (Math.random() * window.innerWidth).toString(),
            star_position_y: (Math.random() * window.innerHeight).toString(),
            star_color: color,
            star_light: starLight.toString(),
          }),
        });

        if (response.ok) {
          // バックエンドから星のデータが返ってきた場合、onStarCreated を呼び出す
          const starData = await response.json();
          onStarCreated(starData);
        } else {
          console.error('星の生成に失敗しました:', response.statusText);
        }
      } catch (error) {
        console.error('星の生成エラー:', error);
      }
    }

    setTitle('');
    setAmount('');
    setAchievedAmount('');
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
        <label htmlFor="achievedAmount">達成量</label>
        <input
          type="number"
          id="achievedAmount"
          value={achievedAmount}
          onChange={(e) => setAchievedAmount(e.target.value)}
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
