'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GoalInput from './GoalInput';
import SubmitButton from './SubmitButton';

// 目標のインターフェース
interface GoalForm {
  goal_name: string;
  goal_quantity: string;
  start_date: string;
  end_date: string;
}

export default function AddGoal() {
  const [goal, setGoal] = useState<GoalForm>({
    goal_name: '',
    goal_quantity: '',
    start_date: '',
    end_date: '',
  });
  const [error, setError] = useState<string>(''); // エラーメッセージ用
  const router = useRouter();

  // 目標入力フォームの変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 目標追加ボタンのクリックイベント
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 入力内容のバリデーション（任意）
    if (!goal.goal_name || !goal.goal_quantity || !goal.start_date) {
      setError('すべてのフィールドを入力してください');
      return;
    }

    try {
      // APIリクエストを送信して目標を追加
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        // 目標追加成功時にホーム画面へ遷移
        router.push('/'); // ホーム画面に遷移
      } else {
        setError('目標の追加に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  return (
    <div className="bg-[#3E4078]/80 p-8 rounded-lg shadow-lg w-130">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        目標作成
      </h2>

      {/* エラーメッセージ */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <GoalInput
          label="目標名"
          type="text"
          name="topic_name"
          value={goal.goal_name}
          onChange={handleChange}
          placeholder="例: スペイン語 外国語など"
        />

        <GoalInput
          label="開始日"
          type="date"
          name="start_date"
          value={goal.start_date}
          onChange={handleChange}
          placeholder="開始日"
        />

        <GoalInput
          label="終了日（任意）"
          type="date"
          name="end_date"
          value={goal.end_date}
          onChange={handleChange}
          placeholder="終了日（任意）"
        />

        <SubmitButton text="目標を追加" onClick={() => {}} />
      </form>
    </div>
  );
}
