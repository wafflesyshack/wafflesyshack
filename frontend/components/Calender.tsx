import React from 'react';
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = [...Array(31).keys()].map((i) => i + 1);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <span>September 2021</span>
      </div>
      <div className={styles.days}>
        {days.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.dates}>
        {dates.map((date) => (
          <div key={date} className={styles.date}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
