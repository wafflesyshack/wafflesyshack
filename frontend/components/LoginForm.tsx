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
import styles from './AuthTab.module.css';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onLoginSuccess: () => void;
  showEmailLogin: boolean;
  setShowEmailLogin: (show: boolean) => void;
}

export default function LoginForm({
  onLoginSuccess,
  showEmailLogin,
  setShowEmailLogin,
}: LoginFormProps) {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      onLoginSuccess();
    }
  }, [user, onLoginSuccess]);

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const token = await user.getIdToken(); // ID トークンを取得
      const response = await fetch('http://localhost:8000/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ID トークンをヘッダーに追加
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          provider: 'google',
        }),
      });
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      router.push(`/users/${user.uid}`);
      onLoginSuccess();
    } catch (error) {
      console.error('Googleログインエラー:', error);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken(); // ID トークンを取得
      const response = await fetch('http://localhost:8000/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ID トークンをヘッダーに追加
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          provider: 'email',
        }),
      });
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      router.push(`/users/${user.uid}`);
      onLoginSuccess();
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
      {!showEmailLogin && (
        <button
          onClick={() => setShowEmailLogin(true)}
          className={`${styles.button} ${styles.emailButton}`}
        >
          メールでログイン
        </button>
      )}
      {showEmailLogin && (
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
      )}
    </div>
  );
}
