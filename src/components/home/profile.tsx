"use client";

import React from "react";
import { ProfileSectionProps } from "@/types/home";
import styles from "./profile.module.css";

const Profile: React.FC<ProfileSectionProps> = ({
  user,
  onClick,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      console.error("onClick is undefined!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Create a synthetic mouse event for onClick compatibility
      const syntheticEvent = {
        currentTarget: e.currentTarget,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as unknown as React.MouseEvent<HTMLElement>;

      if (onClick) {
        onClick(syntheticEvent);
      }
    }
  };

  return (
    <div
      className={`${styles.profileSection} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Profile menu"
    >
      <div className={styles.profileAvatar}>{user.initials}</div>
      <div className={styles.profileInfo}>
        <div className={styles.profileName}>{user.firstName}</div>
        <div className={styles.profileRole}>{user.lastName}</div>
      </div>
      <div className={styles.profileDropdownIcon} />
    </div>
  );
};

export default Profile;
