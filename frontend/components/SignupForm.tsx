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
  const [emailError, setEmailError] = useState(''); // メールアドレスのエラーメッセージ用

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('有効なメールアドレスを入力してください。');
      return;
    } else {
      setEmailError(''); // エラーメッセージをクリア
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const response = await fetch('http://localhost:8000/register_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          provider: 'email',
        }),
      });
      if (response.ok) {
        onSignupSuccess();
      } else {
        console.error('データベース登録エラー:', response);
      }
    } catch (error) {
      console.error('新規登録エラー:', error);
      // エラー処理（例：エラーメッセージの表示）
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const response = await fetch('http://localhost:8000/register_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          provider: 'google',
        }),
      });
      if (response.ok) {
        onSignupSuccess();
      } else {
        console.error('データベース登録エラー:', response);
      }
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
      {emailError && <p className={styles.errorMessage}>{emailError}</p>}{' '}
      {/* エラーメッセージを表示 */}
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
