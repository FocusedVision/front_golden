"use client";

import React from "react";
import { TopBarProps, UserProfile } from "@/types/home";
import styles from "./topbar.module.css";
import { AccountCircle, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import Search from "../home/search";
import Notification from "../home/notification";
import Profile from "../home/profile";

const currentUser: UserProfile = {
  firstName: "Sarah",
  lastName: "Thompson",
  initials: "ST",
};

export const TopBar: React.FC<TopBarProps> = ({
  onSidebarToggle,
  onProfileMenuOpen,
  profileMenuAnchor,
  onProfileMenuClose,
}) => {
  return (
    <header className={styles.topBar}>
      <div className={styles.toolbar}>
        <div className={styles.topBarLeft}>
          <button
            className={styles.menuButton}
            onClick={onSidebarToggle}
            aria-label="Toggle sidebar"
            type="button"
          >
            <MenuIcon />
          </button>

          <Search onSearch={() => {}} />
        </div>

        <div className={styles.topBarRight}>
          <Notification count={3} onClick={() => {}} />

          <Profile user={currentUser} onClick={onProfileMenuOpen} />
        </div>
      </div>

      {profileMenuAnchor && (
        <div
          className={styles.profileMenu}
          style={{
            position: "fixed",
            top: (profileMenuAnchor?.getBoundingClientRect()?.bottom || 0) + 8,
            right:
              window.innerWidth -
              (profileMenuAnchor?.getBoundingClientRect()?.right || 0),
            zIndex: 1000,
          }}
        >
          <div className={styles.profileMenuItem} onClick={onProfileMenuClose}>
            <AccountCircle className={styles.profileMenuIcon} />
            Profile
          </div>
          <div className={styles.profileMenuItem} onClick={onProfileMenuClose}>
            <Settings className={styles.profileMenuIcon} />
            Settings
          </div>
          <div className={styles.profileMenuItem} onClick={onProfileMenuClose}>
            <Logout className={styles.profileMenuIcon} />
            Logout
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {profileMenuAnchor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={onProfileMenuClose}
        />
      )}
    </header>
  );
};

export default TopBar;
