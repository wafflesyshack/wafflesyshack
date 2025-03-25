// components/EmailAuthForm.tsx
// 'use client';
// import { useState } from 'react';
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';
// import { auth } from '../libs/firebase';

// export default function EmailAuthForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         await createUserWithEmailAndPassword(auth, email, password);
//       }
//     } catch (error) {
//       console.error('認証エラー:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="メールアドレス"
//         className="block w-full p-2 border rounded"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="パスワード"
//         className="block w-full p-2 border rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded w-full"
//       >
//         {isLogin ? 'ログイン' : '新規登録'}
//       </button>
//       <button
//         type="button"
//         onClick={() => setIsLogin(!isLogin)}
//         className="text-blue-500 underline"
//       >
//         {isLogin ? 'アカウント作成' : '既存アカウントでログイン'}
//       </button>
//     </form>
//   );
// }
