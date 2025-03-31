'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GoalInput from './GoalInput';
import SubmitButton from './SubmitButton';
import { auth } from '../libs/firebase';
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

interface TopicForm {
  topic_name: string;
  start_date: string;
  end_date: string;
}

export default function AddGoal() {
  const [goal, setTopic] = useState<TopicForm>({
    topic_name: '',
    start_date: '',
    end_date: '',
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTopic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.topic_name || !goal.start_date) {
      setError('すべてのフィールドを入力してください');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('ログインしてください');
        return;
      }
      const uid = user.uid;

      // topicを保存
      const topicResponse = await fetch('http://localhost:8000/topics/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_name: goal.topic_name,
          uid: uid,
          start_date: goal.start_date,
          end_date: goal.end_date,
        }),
      });

      if (!topicResponse.ok) {
        setError('トピックの追加に失敗しました');
        return;
      }

      // topicの情報を取得
      const topicData = await topicResponse.json();

      // users/[uid] 画面に遷移し、topicの情報を渡す
      router.push(
        `/users/${uid}?topicName=${topicData.topic_name}&startDate=${topicData.start_date}&endDate=${topicData.end_date}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  return (
    <div className={`${kaiseiOpti.className} bg-[#3E4078]/80 p-8 rounded-lg shadow-lg w-130`}>
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        目標トピック作成
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <GoalInput
          label="目標トピック"
          type="text"
          name="topic_name"
          value={goal.topic_name}
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
