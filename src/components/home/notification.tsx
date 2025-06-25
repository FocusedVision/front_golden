"use client";

import React from "react";
import { Notifications } from "@mui/icons-material";
import { NotificationProps } from "@/types/home";
import styles from "./notification.module.css";

const Notification: React.FC<NotificationProps> = ({
  count,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`${styles.notificationButton} ${className}`}
      onClick={onClick}
      aria-label={`Notifications ${count > 0 ? `(${count} unread)` : ""}`}
      type="button"
    >
      <Notifications />
      {count > 0 && (
        <span className={styles.notificationBadge}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
};

export default Notification;
