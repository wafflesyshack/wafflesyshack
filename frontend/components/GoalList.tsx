"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Goal {
  goal_id: number;
  username: string;
  goal_name: string;
  goal_quantity: string;
  start_date: string;
  end_date?: string; // 終了日はオプション
}

export default function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]); // 目標データの状態
  const [isHidden, setIsHidden] = useState(false); // 目標リストの表示・非表示管理
  const [isAdding, setIsAdding] = useState(false); // 新しい目標を追加するかどうかの管理
  const [newGoal, setNewGoal] = useState({
    goal_name: "",
    goal_quantity: "",
    start_date: "",
    end_date: "",
  }); // 新しい目標の状態
  const router = useRouter();

  useEffect(() => {
    // バックエンドのAPIから目標データを取得（例: /api/goals）
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals"); // 実際のAPIエンドポイントに置き換えてください
        if (response.ok) {
          const data: Goal[] = await response.json();
          setGoals(data); // 取得した目標データを状態にセット
        } else {
          console.error("目標の取得に失敗しました");
        }
      } catch (error) {
        console.error("目標の取得中にエラーが発生しました:", error);
      }
    };

    fetchGoals(); // コンポーネントがマウントされたときに目標データをフェッチ
  }, []);

  // 目標追加の処理
  const handleAddGoal = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        const addedGoal = await response.json();
        setGoals([...goals, addedGoal]); // 新しい目標をリストに追加
        setIsAdding(false); // フォームを非表示にする
        setNewGoal({
          goal_name: "",
          goal_quantity: "",
          start_date: "",
          end_date: "",
        }); // フォームをリセット
      } else {
        console.error("目標の追加に失敗しました");
      }
    } catch (error) {
      console.error("目標追加中にエラーが発生しました:", error);
    }
  };
  
  return (
    <div
      className={`relative p-4 bg-[#3E4078]/80 rounded-xl shadow-lg text-white w-full sm:w-96 md:w-80 lg:w-[700px] backdrop-blur-sm ml-6 transition-all duration-300 ${
        isHidden ? "h-12 top-72" : "h-80 top-8" // ボタンだけ見える状態の高さ調整
      }`}
    >
      {/* 折りたたみボタン */}
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute top-2 left-2 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10"
      >
       {isHidden ? "Λ" : "V"}
      </button>

      {/* 目標リスト */}
      {!isHidden && (
        <>
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-white text-lg">目標</h2>
          </div>
          <div className="absolute top-2 right-2">
            <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md 
            transition-transform duration-200 ease-in-out hover:scale-110 active:scale-90"
            onClick={() => router.push("/goal-set")}
            >＋</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {goals.map((goal) => (
              <div
                key={goal.goal_id}
                className="p-4 bg-white text-black rounded-md cursor-pointer"
                onClick={() => router.push(`/goal/${goal.goal_id}`)}
              >
                {goal.goal_name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
