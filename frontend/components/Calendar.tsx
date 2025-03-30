import React, { useMemo } from 'react';
import styles from './Calendar.module.css';
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

interface CalendarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Calendar: React.FC<CalendarProps> = ({ className, style }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const result = [];
    for (let i = 0; i < firstDay; i++) {
      result.push({ date: prevMonthDays - firstDay + i + 1, month: month - 1 });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ date: i, month: month });
    }
    const nextMonthDays = 42 - result.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      result.push({ date: i, month: month + 1 });
    }
    return result;
  }, [year, month]);

  return (
    <div className={`${styles.calendar} ${className} ${kaiseiOpti.className}`} style={style}>
      <div className={styles.header}>
        <span>
          {today.toLocaleString('en-US', { month: 'long' })} {year}
        </span>
      </div>
      <div className={styles.days}>
        {days.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
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

export default Calendar;
