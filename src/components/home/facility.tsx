"use client";

import React from "react";
import { FacilityProps, FacilityData } from "@/types/home";
import styles from "./facility.module.css";
import Image from "next/image";
import Chip from "@/components/home/chip";

const Facility: React.FC<FacilityProps> = ({ data }) => {
  const getPerformanceVariant = (performance: FacilityData["performance"]) => {
    switch (performance) {
      case "good":
        return "good";
      case "bad":
        return "bad";
      case "normal":
      default:
        return "normal";
    }
  };

  return (
    <div className={`${styles.facilitySection}`}>
      <div className={styles.facilityWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th />
              <th style={{ textAlign: "left" }}>Facility Name</th>
              <th>Reviews</th>
              <th>Conversion Rate</th>
              <th>Average Rate</th>
              <th>Feedback Not Reviewed</th>
              <th>Review Not Responded</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((facility, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.facilityLogo}>
                  <Image
                    src={"/facility_logo.png"}
                    alt="Facility Logo"
                    width={32}
                    height={32}
                  />
                </td>
                <td className={styles.facilityName}>
                  {facility.facility_name}
                </td>
                <td className={styles.numberCell}>
                  {facility.reviews.toLocaleString()}
                </td>
                <td className={styles.numberCell}>
                  {facility.conversion_rate}%
                </td>
                <td className={styles.numberCell}>{facility.average_rate}</td>
                <td className={styles.numberCell}>
                  {facility.feedback_not_reviewed}
                </td>
                <td className={styles.numberCell}>
                  {facility.review_not_responded}
                </td>
                <td className={styles.performanceCell}>
                  <Chip
                    variant={getPerformanceVariant(facility.performance)}
                    size="md"
                  >
                    {facility.performance}
                  </Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facility;
