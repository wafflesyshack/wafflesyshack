'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './AuthTab.module.css';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showEmailLogin, setShowEmailLogin] = useState(false); // メールログインの表示状態

  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/');
  };

  const handleSignupSuccess = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'login' ? styles.tabButtonActive : ''
            }`}
            onClick={() => {
              setActiveTab('login');
              setShowEmailLogin(false); // ログインタブ選択時にメールログインを非表示にする
            }}
          >
            ログイン
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'signup' ? styles.tabButtonActive : ''
            }`}
            onClick={() => setActiveTab('signup')}
          >
            新規登録
          </button>
        </div>
        {activeTab === 'login' ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            showEmailLogin={showEmailLogin}
            setShowEmailLogin={setShowEmailLogin} // setShowEmailLogin を渡す
          />
        ) : (
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        )}
      </div>
    </>
  );
}
