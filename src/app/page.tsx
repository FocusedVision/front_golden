"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function MainPage() {
  const router = useRouter();

  const handleTrialClick = () => {
    router.push("/auth/register");
  };

  return (
    <div className={styles.section}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo1.png"
          alt="Logo"
          width={60}
          height={60}
          className={styles.logoImage}
        />
        <Image
          src="/logo2.png"
          alt="Logo"
          width={150}
          height={50}
          className={styles.logoImage}
        />
      </div>

      {/* Company Information Section */}
      <div className={styles.companyInfoContainer}>
        <div className={styles.companyInfo}>
          <h1 className={styles.companyTitle}>Golden Reputation</h1>
          <p className={styles.companyDescription}>
            Empowering businesses to build, monitor, and protect their digital
            reputation through innovative SaaS solutions. We provide
            comprehensive reputation management tools that help you maintain
            trust and credibility in the digital landscape.
          </p>

          <button className={styles.trialButton} onClick={handleTrialClick}>
            Try for free
          </button>
        </div>
      </div>

      <div className={styles.decorativeContainer}>
        <Image
          src="/mask.png"
          alt="Golden Decorative Mask"
          fill
          className={styles.decorativeImage}
          priority
        />
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.separator} />
        <div className={styles.websiteUrl}>www.goldenreputation.io</div>
      </div>
    </div>
  );
}
