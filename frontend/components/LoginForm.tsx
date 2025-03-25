'use client';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../libs/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useEffect } from 'react';
import styles from './AuthTab.module.css'; // スタイルをインポート

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      onLoginSuccess();
    }
  }, [user, onLoginSuccess]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // onLoginSuccess()は不要（useEffectで処理）
    } catch (error) {
      console.error('Googleログインエラー:', error);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onLoginSuccess()は不要（useEffectで処理）
    } catch (error) {
      console.error('Emailログインエラー:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        ログアウト
      </button>
    );
  }

  return (
    <div className={styles.loginForm}>
      <button
        onClick={handleGoogleLogin}
        className={`${styles.button} ${styles.googleButton}`}
      >
        Googleでログイン
      </button>
      <form onSubmit={handleEmailLogin} className={styles.loginForm}>
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
          メールでログイン
        </button>
      </form>
    </div>
  );
}
