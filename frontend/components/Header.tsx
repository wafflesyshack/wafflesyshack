'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './AuthTab.module.css'; // スタイルをインポート

const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login'); // ログアウト後にログインページにリダイレクト
  };

  return (
    <header className="bg-gray-100 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">アプリ名</span>
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className={`${styles.button} ${styles.logoutButton}`}
          >
            ログアウト
          </button>
        ) : (
          <Link href="/login">
            <span className={`${styles.button} ${styles.emailButton}`}>
              ログイン
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
