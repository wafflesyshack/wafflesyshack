import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { goalId } = req.query;

  // goalId に基づいてデータベースから目標データを取得する処理を記述
  // ここでは、サンプルデータを返します
  const goal = {
    id: goalId,
    name: 'スペイン語',
    quantity: '毎日2時間',
    streak: 8,
    total: 15,
    calendar: [
      { date: '2023-10-23', status: '達成' },
      { date: '2023-10-24', status: '未達成' },
      // ... カレンダーのデータを追加
    ],
  };

  res.status(200).json(goal);
}
