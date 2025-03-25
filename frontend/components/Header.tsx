'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../libs/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            ログアウト
          </button>
        ) : (
          <Link href="/login">
            <span className="bg-blue-500 text-white px-4 py-2 rounded">
              ログイン
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
