"use client";

import React from "react";
import { ProgressBarProps } from "@/types/home";
import styles from "./feedback.module.css";

const ProgressBar: React.FC<ProgressBarProps> = ({
  data,
  showLabel = true,
  showValue = true,
  className = "",
}) => {
  const { label, value, maxValue = 100, color = "primary" } = data;
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

  const getColorClass = () => {
    switch (color) {
      case "success":
        return styles.progressSuccess;
      case "warning":
        return styles.progressWarning;
      case "error":
        return styles.progressError;
      case "primary":
      default:
        return styles.progressPrimary;
    }
  };

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <div className={styles.progressHeader}>
        {showLabel && <div className={styles.progressLabel}>{label}</div>}

        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${getColorClass()}`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={label}
            />
          </div>
          {showValue && <div className={styles.progressValue}>{value}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
