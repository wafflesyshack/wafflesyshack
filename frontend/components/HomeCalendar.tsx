import React, { useMemo } from 'react';
import styles from './Calendar.module.css';
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
});

interface CalendarProps {
  selectedMonth: number; // 選択された月を受け取る
  data: any[]; // データを受け取る
  className?: string;
  style?: React.CSSProperties;
}

const HomeCalendar: React.FC<CalendarProps> = ({ selectedMonth, data, className, style }) => {
  const today = new Date();
  const year = today.getFullYear();
  
  // 選択された月を使用
  const month = selectedMonth;

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const result = [];
    
    // 前月の日付を追加
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDate = prevMonthDays - firstDay + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;  // 1月の場合は前月が12月になる
      result.push({ date: prevMonthDate, month: prevMonth });
    }
    
    // 今月の日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ date: i, month: month });
    }
    
    // 翌月の日付を追加
    const nextMonthDays = 42 - result.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextMonth = month === 11 ? 0 : month + 1; // 12月の場合は翌月が1月になる
      result.push({ date: i, month: nextMonth });
    }
    
    return result;
  }, [year, month]);

  return (
    <div className={`${styles.calendar} ${className} ${kaiseiOpti.className}`} style={style}>
      {/* 選択された月と年を表示 */}
      <div className={styles.header}>
        <span className="text-lg font-semibold">
          {`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}
        </span>
      </div>
      {/* 曜日表示 */}
      <div className={styles.days}>
        {days.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
      {/* 日付表示 */}
      <div className={styles.dates}>
        {dates.map((item, index) => {
          const isToday =
            item.date === today.getDate() && item.month === today.getMonth();
          const isPrevMonth = item.month < month;
          const isNextMonth = item.month > month;
          return (
            <div
              key={`${item.date}-${index}`}
              className={`${styles.date} ${isToday ? styles.today : ''} ${
                isPrevMonth || isNextMonth ? styles.otherMonth : ''
              }`}
            >
              {item.date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCalendar;
