// app/auth/page.tsx
import AuthTabs from '../../../components/AuthTab';

const AuthPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">認証</h1>
      {/* AuthTabsコンポーネントを表示 */}
      <AuthTabs />
    </div>
  );
};

export default AuthPage;
