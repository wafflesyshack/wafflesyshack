'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GoalList.module.css';
import { Kaisei_Opti } from 'next/font/google';
import { auth } from '../libs/firebase';

const kaiseiOpti = Kaisei_Opti({
  weight: ['400', '700'],
  subsets: ['latin'],
});

interface Topic {
  topic_id: number;
  uid: string;
  topic_name: string;
  start_date: string;
  end_date?: string;
}

interface GoalListProps {
  topicName?: string;
  startDate?: string;
  endDate?: string;
}

export default function GoalList({
  topicName,
  startDate,
  endDate,
}: GoalListProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [uid, setUid] = useState<string | null>(null); // uid を state に追加
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // uid を state に保存
        fetchTopics(user.uid);
      } else {
        console.error('ログインしてください');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTopics = async (currentUid: string) => {
    // uid を引数として受け取る
    try {
      const response = await fetch(
        `http://localhost:8000/topics/?uid=${currentUid}`
      );
      if (response.ok) {
        const data: Topic[] = await response.json();
        setTopics(data);
      } else {
        console.error('目標トピックの取得に失敗しました');
      }
    } catch (error) {
      console.error('目標トピックの取得中にエラーが発生しました:', error);
    }
  };

  return (
    <div className={styles.goalListContainer}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${kaiseiOpti.className}`}>
          目標トピック
        </h2>
      </div>
      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => router.push('/goal-set')}
        >
          ＋
        </button>
      </div>
      <div className={styles.goalItems}>
        {topics.map((topic) => (
          <div
            key={topic.topic_id}
            className={styles.goalItem}
            onClick={() => {
              if (uid) {
                router.push(`/goal/${topic.topic_id}?uid=${uid}`); // uid を渡す
              } else {
                console.error('uid が取得できませんでした');
              }
            }}
          >
            {topic.topic_name}
            {topicName && <p>追加されたトピック: {topicName}</p>}
            {startDate && <p>開始日: {startDate}</p>}
            {endDate && <p>終了日: {endDate}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
