"use client";

import React from "react";
import { StatCardData, StatCardProps } from "@/types/home";
import styles from "./stats.module.css";
import { TrendingUp } from "@mui/icons-material";
import { TrendingDown } from "@mui/icons-material";
import Image from "next/image";

interface StatsProps {
  stats: StatCardData[];
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ stats, className = "" }) => {
  const getTrendIcon = (stat: StatCardData) => {
    if (stat.trendDirection === "up") {
      return <TrendingUp className={styles.trendIcon} />;
    } else if (stat.trendDirection === "down") {
      return <TrendingDown className={styles.trendIcon} />;
    }
    return null;
  };

  const getTrendClass = (stat: StatCardData) => {
    switch (stat.trendDirection) {
      case "up":
        return styles.trendUp;
      case "down":
        return styles.trendDown;
      default:
        return styles.trendNeutral;
    }
  };

  return (
    <section className={`${styles.statsSection} ${className}`}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div className={`${styles.statCard} ${className}`} key={index}>
            <div className={styles.statCardHeader}>
              <div className={styles.statCardContent}>
                <h3 className={styles.statCardTitle}>{stat.title}</h3>
                <div className={styles.statCardValue}>{stat.value}</div>
                <div
                  className={`${styles.statCardTrend} ${getTrendClass(stat)}`}
                >
                  {getTrendIcon(stat)}
                  <span className={styles.trendValue}>{stat.trend}</span>
                  <span className={styles.trendLabel}>{stat.trendLabel}</span>
                </div>
              </div>
              <div className={styles.statCardIcon}>
                <Image
                  src={stat.iconSrc}
                  alt={stat.title}
                  width={48}
                  height={48}
                  className={styles.iconImage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
