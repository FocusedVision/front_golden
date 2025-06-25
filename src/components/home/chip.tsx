"use client";

import React from "react";
import { ChipProps } from "@/types/home";
import styles from "./chip.module.css";

const Chip: React.FC<ChipProps> = ({ variant, children, size = "md" }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "good":
        return styles.chipGood;
      case "bad":
        return styles.chipBad;
      case "normal":
        return styles.chipNormal;
      case "published":
        return styles.chipPublished;
      case "unpublished":
        return styles.chipUnpublished;
      default:
        return styles.chipNormal;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return styles.chipSm;
      case "lg":
        return styles.chipLg;
      case "md":
      default:
        return styles.chipMd;
    }
  };

  return (
    <span className={`${styles.chip} ${getVariantClass()} ${getSizeClass()}`}>
      {children}
    </span>
  );
};

export default Chip;
