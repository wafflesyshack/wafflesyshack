'use client'; // クライアントコンポーネントとして指定

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
    <div className="w-full max-w-md mx-auto">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${
            activeTab === 'login' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('login')}
        >
          ログイン
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === 'signup' ? 'border-b-2 border-blue-500' : ''
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
