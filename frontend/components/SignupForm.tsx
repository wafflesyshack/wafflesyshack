'use client';
import { useState } from 'react';
import { auth } from '../libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './AuthTab.module.css'; // スタイルをインポート

interface SignupFormProps {
  onSignupSuccess: () => void;
}

export default function SignupForm({ onSignupSuccess }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignupSuccess();
    } catch (error) {
      console.error('新規登録エラー:', error);
      // エラー処理（例：エラーメッセージの表示）
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.signupForm}>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button
        type="submit"
        className={`${styles.button} ${styles.emailButton}`}
      >
        新規登録
      </button>
    </form>
  );
}
