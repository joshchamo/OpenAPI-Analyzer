"use client";

import React, { useState, useMemo } from "react";
import { QualityReport as QualityReportType } from "@/lib/types";
import { AlertTriangle, AlertCircle, Info, CheckCircle2, ShieldAlert, Download } from "lucide-react";
import styles from "./QualityReport.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface QualityReportProps {
  report: QualityReportType;
}

type SeverityFilter = "all" | "error" | "warning" | "info";

export const QualityReport: React.FC<QualityReportProps> = ({ report }) => {
  const [filter, setFilter] = useState<SeverityFilter>("all");

  const filteredIssues = useMemo(() => {
    if (filter === "all") return report.issues;
    return report.issues.filter(issue => issue.severity === filter);
  }, [report.issues, filter]);

  const downloadCSV = () => {
    const headers = ["Severity", "Category", "Location", "Message"];
    const rows = report.issues.map(i => [
      i.severity.toUpperCase(),
      i.category,
      `"${i.location.replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "openspec-quality-report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <button 
            className={`${styles.statItem} ${styles.all} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            <CheckCircle2 size={20} />
            <div className={styles.statInfo}>
              <span className={styles.statCount}>{report.issues.length}</span>
              <span className={styles.statName}>Total Issues</span>
            </div>
          </button>
          
          <button 
            className={`${styles.statItem} ${styles.error} ${filter === "error" ? styles.active : ""}`}
            onClick={() => setFilter("error")}
          >
            <AlertCircle size={20} />
            <div className={styles.statInfo}>
              <span className={styles.statCount}>{report.stats.errors}</span>
              <span className={styles.statName}>Errors</span>
            </div>
          </button>
          
          <button 
            className={`${styles.statItem} ${styles.warning} ${filter === "warning" ? styles.active : ""}`}
            onClick={() => setFilter("warning")}
          >
            <AlertTriangle size={20} />
            <div className={styles.statInfo}>
              <span className={styles.statCount}>{report.stats.warnings}</span>
              <span className={styles.statName}>Warnings</span>
            </div>
          </button>
          
          <button 
            className={`${styles.statItem} ${styles.info} ${filter === "info" ? styles.active : ""}`}
            onClick={() => setFilter("info")}
          >
            <Info size={20} />
            <div className={styles.statInfo}>
              <span className={styles.statCount}>{report.stats.info}</span>
              <span className={styles.statName}>Insights</span>
            </div>
          </button>
        </div>
      </div>

      <div className={styles.issueList}>
        <div className={styles.listHeader}>
          <h3>
            {filter === "all" ? "All Issues" : `${filter.charAt(0).toUpperCase() + filter.slice(1)}s`}
            <span className={styles.countBadge}>{filteredIssues.length}</span>
          </h3>
          <button className={styles.downloadBtn} onClick={downloadCSV}>
            <Download size={18} />
            <span>Download Report (CSV)</span>
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredIssues.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.perfectScore}
            >
              <CheckCircle2 size={48} color="#10b981" />
              <p>No {filter !== "all" ? filter : ""} issues detected in this specification.</p>
            </motion.div>
          ) : (
            <div className={styles.issues}>
              {filteredIssues.slice(0, 100).map((issue, i) => (
                <motion.div 
                  key={`${issue.location}-${issue.message}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`${styles.issueCard} ${styles[issue.severity]}`}
                >
                  <div className={styles.issueIcon}>
                    {issue.severity === "error" && <ShieldAlert size={18} />}
                    {issue.severity === "warning" && <AlertTriangle size={18} />}
                    {issue.severity === "info" && <Info size={18} />}
                  </div>
                  <div className={styles.issueMain}>
                    <div className={styles.issueHeader}>
                      <span className={styles.category}>{issue.category}</span>
                      <span className={styles.location}>{issue.location}</span>
                    </div>
                    <p className={styles.message}>{issue.message}</p>
                  </div>
                </motion.div>
              ))}
              {filteredIssues.length > 100 && (
                <p className={styles.limitNotice}>
                  Showing first 100 issues. Use filters to narrow down the results.
                </p>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
