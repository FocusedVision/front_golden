"use client";

import React, { useState } from "react";
import {
  StatCardData,
  FacilityData,
  FeedbackStatData,
  ReviewsTrendData,
} from "@/types/home";
import styles from "./layout.module.css";
import Stats from "@/components/home/stats";
import Feedback from "@/components/home/feedback";
import Trend from "@/components/home/trend";
import Facility from "@/components/home/facility";
import Month from "@/components/home/month";

const getCurrentMonth = () => {
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
  const currentDate = new Date();
  return months[currentDate.getMonth()];
};

const stats: StatCardData[] = [
  {
    title: "Total Reviews",
    value: "40,689",
    iconSrc: "/card-icon-1.png",
    trend: "8.5%",
    trendLabel: "Up from yesterday",
    trendDirection: "up",
    iconBg: "#4A90E2",
  },
  {
    title: "Conversion rate",
    value: "92%",
    iconSrc: "/card-icon-2.png",
    trend: "1.3%",
    trendLabel: "Up from yesterday",
    trendDirection: "up",
    iconBg: "#F5A623",
  },
  {
    title: "Delivery Success Rate",
    value: "89%",
    iconSrc: "/card-icon-3.png",
    trend: "4.3%",
    trendLabel: "Down from yesterday",
    trendDirection: "down",
    iconBg: "#50C878",
  },
  {
    title: "New Reviews",
    value: "2040",
    iconSrc: "/card-icon-4.png",
    trend: "1.8%",
    trendLabel: "Up from yesterday",
    trendDirection: "up",
    iconBg: "#E74C3C",
  },
];

const facilityData: FacilityData[] = [
  {
    facility_name: "Golden Storage",
    reviews: 159,
    conversion_rate: 6.0,
    average_rate: 24,
    feedback_not_reviewed: 4.0,
    review_not_responded: 40,
    performance: "good",
  },
];

const feedbackStats: FeedbackStatData[] = [
  { name: "Communication", value: 60 },
  { name: "Team Friendliness", value: 72 },
  { name: "Facility Cleanliness", value: 78 },
  { name: "Unit Selection", value: 38 },
  { name: "Rental Process", value: 38 },
];

const generateTrendData = (month: string): ReviewsTrendData[] => {
  const monthData: {
    [key: string]: { days: number; abbrev: string; baseValue: number };
  } = {
    January: { days: 31, abbrev: "Jan", baseValue: 8000 },
    February: { days: 28, abbrev: "Feb", baseValue: 9000 },
    March: { days: 31, abbrev: "Mar", baseValue: 12000 },
    April: { days: 30, abbrev: "Apr", baseValue: 14000 },
    May: { days: 31, abbrev: "May", baseValue: 13000 },
    June: { days: 30, abbrev: "Jun", baseValue: 15000 },
    July: { days: 31, abbrev: "Jul", baseValue: 16000 },
    August: { days: 31, abbrev: "Aug", baseValue: 17000 },
    September: { days: 30, abbrev: "Sep", baseValue: 18000 },
    October: { days: 31, abbrev: "Oct", baseValue: 1000 },
    November: { days: 30, abbrev: "Nov", baseValue: 11000 },
    December: { days: 31, abbrev: "Dec", baseValue: 1000 },
  };

  const monthInfo = monthData[month];
  if (!monthInfo) return [];

  const data: ReviewsTrendData[] = [];

  for (let day = 1; day <= monthInfo.days; day++) {
    let reviews = monthInfo.baseValue;

    const midMonth = Math.floor(monthInfo.days / 2);
    if (day <= 10) {
      reviews =
        monthInfo.baseValue * (0.7 + (day / 10) * 0.3) + Math.random() * 1000;
    } else if (day <= midMonth) {
      const peakFactor =
        1 + 0.4 * Math.sin(((day - 10) / (midMonth - 10)) * Math.PI);
      reviews = monthInfo.baseValue * peakFactor + Math.random() * 1500;
    } else {
      const declineFactor =
        1 - ((day - midMonth) / (monthInfo.days - midMonth)) * 0.2;
      reviews = monthInfo.baseValue * declineFactor + Math.random() * 1000;
    }

    data.push({
      day: day.toString(),
      reviews: Math.max(1000, Math.round(reviews)),
      displayDay: `${monthInfo.abbrev} ${day}`,
    });
  }

  return data;
};

const Homepage: React.FC = () => {
  const [globalMonth, setGlobalMonth] = useState(getCurrentMonth());

  return (
    <div className={styles.homePageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Home</h1>
      </header>

      <main className={styles.mainContent}>
        <Stats stats={stats} className={styles.statsSection} />

        <div className={styles.contentGrid}>
          <section className={styles.feedbackSection}>
            <div className={styles.feedbackHeader}>
              <h2 className={styles.feedbackTitle}>Feedback Stats</h2>
              <div style={{ visibility: "hidden" }}>
                <Month
                  selectedMonth={globalMonth}
                  onMonthChange={setGlobalMonth}
                />
              </div>
            </div>
            <Feedback data={feedbackStats} className={styles.feedbackSection} />
          </section>

          <section className={styles.trendSection}>
            <div className={styles.trendHeader}>
              <h2 className={styles.trendTitle}>Reviews Trend</h2>
              <Month
                selectedMonth={globalMonth}
                onMonthChange={setGlobalMonth}
              />
            </div>
            <Trend
              data={generateTrendData(globalMonth)}
              className={styles.trendSection}
            />
          </section>
        </div>

        <div className={styles.facilityGrid}>
          <section className={styles.facilitySection}>
            <div className={styles.facilityHeader}>
              <h2 className={styles.facilityTitle}>Facility Details</h2>
              <Month
                selectedMonth={globalMonth}
                onMonthChange={setGlobalMonth}
              />
            </div>
            <Facility data={facilityData} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
