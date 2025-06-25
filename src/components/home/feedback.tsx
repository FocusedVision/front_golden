"use client";

import React from "react";
import { FeedbackStatData, ProgressBarData } from "@/types/home";
import styles from "./feedback.module.css";
import ProgressBar from "./progressBar";

interface FeedbackProps {
  data: FeedbackStatData[];
  title?: string;
  className?: string;
}

const Feedback: React.FC<FeedbackProps> = ({ data, className = "" }) => {
  const convertToProgressData = (
    feedback: FeedbackStatData,
  ): ProgressBarData => {
    // Determine color based on value ranges
    let color: "primary" | "success" | "warning" | "error" = "primary";

    if (feedback.value >= 80) {
      color = "success";
    } else if (feedback.value >= 60) {
      color = "primary";
    } else if (feedback.value >= 40) {
      color = "warning";
    } else {
      color = "error";
    }

    return {
      label: feedback.name,
      value: feedback.value,
      maxValue: 100,
      color,
    };
  };

  return (
    <section className={`${className}`}>
      <div className={styles.feedbackCard}>
        <div className={styles.feedbackContent}>
          {data.map((feedback, index) => (
            <ProgressBar
              key={index}
              data={convertToProgressData(feedback)}
              showLabel={true}
              showValue={true}
              className={styles.progressBarWrapper}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
