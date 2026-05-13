"use client";

import React from "react";
import { Shield, Zap } from "lucide-react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.iconWrapper}>
            <Zap className={styles.icon} size={24} />
          </div>
          <h1>OpenAPI <span className={styles.gradientText}>Analyzer</span></h1>
        </div>
        <div className={styles.badge}>
          <Shield size={14} />
          <span>QA Professional Tool</span>
        </div>
      </div>
    </header>
  );
};
