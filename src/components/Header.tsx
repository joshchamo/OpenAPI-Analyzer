"use client";

import React from "react";
import { Shield, Zap } from "lucide-react";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => window.location.href = "/"}>
          <Logo />
          <h1>Open<span className={styles.gradientText}>Spec</span></h1>
        </button>
        <div className={styles.badge}>
          <Shield size={14} />
          <span>QA Professional Tool</span>
        </div>
      </div>
    </header>
  );
};
