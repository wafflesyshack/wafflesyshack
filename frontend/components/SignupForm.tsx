'use client';

import { useState } from 'react';
import { auth, googleProvider } from '../libs/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styles from './AuthTab.module.css';

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

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onSignupSuccess();
    } catch (error) {
      console.error('Googleサインアップエラー:', error);
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.signupForm}>
      <button
        onClick={handleGoogleSignup}
        className={`${styles.button} ${styles.googleButton}`}
      >
        Googleでサインアップ
      </button>
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
