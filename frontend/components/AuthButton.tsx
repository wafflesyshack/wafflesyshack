// components/AuthButton.tsx
// 'use client';
// import { useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, googleProvider } from '../libs/firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// export default function AuthButton() {
//   const [user] = useAuthState(auth);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error('Googleログインエラー:', error);
//     }
//   };

//   const handleEmailLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error('Emailログインエラー:', error);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   if (user) {
//     return (
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         ログアウト
//       </button>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <button
//         onClick={handleGoogleLogin}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Googleで続ける
//       </button>
//       <div>
//         <input
//           type="email"
//           placeholder="メールアドレス"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border rounded px-2 py-1 mb-2"
//         />
//         <input
//           type="password"
//           placeholder="パスワード"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border rounded px-2 py-1 mb-2"
//         />
//         <button
//           onClick={handleEmailLogin}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           メールでログイン
//         </button>
//       </div>
//     </div>
//   );
// }
