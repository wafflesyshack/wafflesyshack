// app/add-goal/page.tsx

import AddGoal from "../../../components/AddGoal"; // AddGoal コンポーネントをインポート
import styles from './goal-set.module.css';

const AddGoalPage = () => {
  return (
    <div className={styles.container}>

      {/* AddGoal コンポーネントを表示 */}
      <AddGoal />
    </div>

  );
};

export default AddGoalPage;
