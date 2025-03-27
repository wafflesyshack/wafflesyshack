"use client";

import { useState } from "react";

interface CalendarProps {
  data: any[]; // カレンダーのデータ形式に合わせて型を設定
}

const Calendar: React.FC<CalendarProps> = ({ data }) => {
  const [isHidden, setIsHidden] = useState(false); // カレンダーの表示・非表示管理
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // 選択された月を保持

  // 月のリスト（仮の月名を使用）
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div
      className={`relative p-6 bg-[#3E4078]/80 rounded-xl shadow-lg text-white w-full sm:w-96 md:w-80 lg:w-[600px] backdrop-blur-sm ml-6 transition-all duration-300 ${
        isHidden ? "h-12 top-72" : "h-80 top-8" 
      }`}
    >
      {/* 折りたたみボタン */}
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute top-2 left-2 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10"
      >
        {isHidden ? "Λ" : "V"}
      </button>

      {/* カレンダー */}
      {!isHidden && (
        <>
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-white text-lg" style={{ fontFamily: "Comic Sans MS, sans-serif" }}>Memories</h2>
          </div>

          {/* 追加ボタン（右上） 
          <div className="absolute top-2 right-2">
            <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md">＋</button>
          </div>*/}

          {/* 本棚の棚部分（3段） */}
          <div className="relative w-full h-60 bg-[#8E6B4F] rounded-lg shadow-md mb-4">
            {/* 背景としての棚本体 */}
            <div className="absolute inset-0 bg-[#6B4C3B] rounded-lg shadow-lg"></div>

            {/* 上段の棚板 */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3B2A1D]"></div>
            {/* 中段の棚板 */}
            <div className="absolute top-[34%] left-0 w-full h-[2px] bg-[#3B2A1D]"></div>
            {/* 下段の棚板 */}
            <div className="absolute top-[66%] left-0 w-full h-[2px] bg-[#3B2A1D]"></div>

            {/* 本棚のタブ（本のような形に） */}
            <div className="absolute top-[5%] left-4 right-4 w-full flex flex-wrap gap-2">
              {months.map((month, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMonth(index)}
                  className={`w-7 h-17 bg-[#D0A96F] rounded-sm shadow-lg flex items-center justify-center cursor-pointer  ${
                    selectedMonth === index ? "scale-110 bg-[#FF8C00]" : "bg-[#6B4C3B]"
                  }`}
                  style={{
                    position: "relative",
                    borderRadius: "5px", // 丸みを弱める
                    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)", // 影を追加
                  }}
                >
                  {/* 背表紙の装飾 */}
                  <div
                    className="absolute inset-0 rounded-md shadow-lg"
                    style={{
                      borderTopLeftRadius: "5px", // 少し丸みをつける
                      borderTopRightRadius: "5px",
                      borderBottomLeftRadius: "3px", // 下側を少しカーブさせる
                      borderBottomRightRadius: "3px",
                      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // 立体感を強調
                    }}
                  />
                  {/* 背表紙の上部を白くする */}
                  <div
                    className="absolute top-0 left-0 w-full h-[4px] bg-white"
                    style={{
                      borderTopLeftRadius: "5px", // 上部に丸みをつける
                      borderTopRightRadius: "5px",
                    }}
                  />
                  {/* 背表紙の線（装飾） */}
                  <div
                    className="absolute top-[4px] left-0 w-full h-[2px] bg-[#99755c]"
                    style={{
                      marginBottom: "5px", // 下に少し余白を追加
                    }}
                  />
                  {/* 月名 */}
                  <span
                    className="text-xs text-white text-center font-bold"
                    style={{
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // 文字に影をつけて目立たせる
                      fontSize: "0.9rem", // 少しフォントサイズを大きく
                    }}
                  >
                    {month.substring(0, 3)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {data.map((entry, index) => (
              <div
                key={index}
                className="p-4 bg-white text-black rounded-md cursor-pointer"
              >
                <span>{entry.date}</span> - <span>{entry.event}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
