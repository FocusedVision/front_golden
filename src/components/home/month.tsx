"use client";

import React, { useState } from "react";
import styles from "./month.module.css";

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  className?: string;
}

const Month: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (month: string) => {
    onMonthChange(month);
    setOpen(false);
  };

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <div className={styles.selectMonth} onClick={toggleDropdown}>
        <span>{selectedMonth}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.selectArrow} ${open ? styles.selectArrowOpen : ""}`}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {open && (
        <div className={styles.selectDropdown}>
          {months.map((monthOption) => (
            <div
              key={monthOption}
              className={`${styles.selectOption} ${monthOption === selectedMonth ? styles.selectOptionActive : ""}`}
              onClick={() => handleChange(monthOption)}
            >
              {monthOption}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Month;
