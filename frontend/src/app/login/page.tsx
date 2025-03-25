// app/login/page.tsx
import AuthTabs from '../../../components/AuthTab';
import styles from './login.module.css'; // スタイルをインポート

const AuthPage = () => {
  return (
    <div className={styles.container}>
      {' '}
      {/* スタイルを適用 */}
      <AuthTabs />
    </div>
  );
};

export default AuthPage;
