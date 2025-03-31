'use client';

import { useState, useEffect } from 'react';
import HomeCalendar from './HomeCalendar';
import { useRouter } from 'next/navigation';
import styles from './CalendarShelf.module.css'; // CSSをインポート
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });


interface CalendarProps {
  data: any[]; // カレンダーのデータ形式に合わせて型を設定
}

const CalendarShelf: React.FC<CalendarProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // 初期状態でnullに変更
  const [showCalendar, setShowCalendar] = useState<boolean>(false); // 最初はカレンダーを非表示
  const router = useRouter();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // 月を選択したときのみカレンダーを表示
    if (selectedMonth !== null) {
      setShowCalendar(true);
    }
  }, [selectedMonth]);

  const handleMonthClick = (index: number) => {
    if (selectedMonth === index) {
      setSelectedMonth(null); // 再度選択した月を非表示
      setShowCalendar(false); // カレンダー非表示
    } else {
      setSelectedMonth(index);
      setShowCalendar(true); // 新しい月を選択した場合はカレンダーを表示
    }
  };

  const handleBackToShelf = () => {
    setSelectedMonth(null); // 本棚に戻るためにselectedMonthをnullにリセット
    setShowCalendar(false);  // カレンダー非表示
  };

  return (
    <div className={`${styles.shelfContainer} ${kaiseiOpti.className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>記録</h2> 
      </div>

      <div className={styles.shelf}>
        <div className={styles.shelfBoard} />
        <div className={styles.shelfBoard} />
        <div className={styles.shelfBoard} />

        <div className={styles.months}>
          {months.map((month, index) => (
            <div
              key={index}
              onClick={() => handleMonthClick(index)}
              className={`${styles.monthTab} ${selectedMonth === index ? styles.activeMonth : ''}`}
            >
              <div className={styles.spineDecoration} />
              <div className={styles.spineTop} />
              <div className={styles.spineLine} />
              <span className={styles.monthText}>{month.substring(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedMonth !== null && (
        <div
          className={`${styles.calendarWrapper} ${showCalendar ? styles.show : ''}`}
        >
<button
  className={`${styles.backButton} ${kaiseiOpti.className}`}
  onClick={handleBackToShelf}
>
  ◀︎もどる
</button>
          <HomeCalendar selectedMonth={selectedMonth} data={data} />
        </div>
      )}
    </div>
  );
};

export default CalendarShelf;
