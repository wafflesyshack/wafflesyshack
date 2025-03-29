'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './AuthTab.module.css'; // スタイルをインポート
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login'); // ログアウト後にログインページにリダイレクト
  };

  return (
    <header 
      style={{ backgroundColor: 'rgba(17, 17, 68)' }} 
      className="py-4 shadow-lg "
    >
      <nav className="container mx-auto flex justify-between items-center">
        {/* 🏠 ホームページフォルダに移動するボタン */}
        <Link href="/homepage" passHref>
          <button className={`${styles.homeButton} ${kaiseiOpti.className}`}>
            <img
              src="/images/homebutton.png" 
              alt="ホーム"
              className="w-12 h-12" // 画像のサイズ調整
            />
          </button>
        </Link>
        
        <Link href="/">
         <span className={`text-white ${kaiseiOpti.className} text-xl font-bold`}>
           夜空の記録
         </span>
        </Link>
        
        {user ? (
          <button
            onClick={handleLogout}
            className={`${styles.button} ${kaiseiOpti.className} ${styles.logoutButton}`}
          >
            ログアウト
          </button>
        ) : (
          <Link href="/login">
            <span className={`${styles.button} ${kaiseiOpti.className} ${styles.loginButton}`}>
              ログイン
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
