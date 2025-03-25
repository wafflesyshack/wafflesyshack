'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './AuthTab.module.css'; // スタイルをインポート

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/');
  };

  const handleSignupSuccess = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      {' '}
      {/* スタイルを適用 */}
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'login' ? styles.tabButtonActive : ''
          }`}
          onClick={() => setActiveTab('login')}
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
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      )}
    </div>
  );
}
