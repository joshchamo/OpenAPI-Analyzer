"use client";

import React, { useState } from "react";
import { AnalyzedSpec } from "@/lib/types";
import { EndpointCard } from "./EndpointCard";
import { SchemaCard } from "./SchemaCard";
import { Info, List, Database, ShieldCheck } from "lucide-react";
import styles from "./Dashboard.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardProps {
  spec: AnalyzedSpec;
}

export const Dashboard: React.FC<DashboardProps> = ({ spec }) => {
  const [activeTab, setActiveTab] = useState<"endpoints" | "schemas" | "info">("endpoints");

  const tabs = [
    { id: "endpoints", label: "Endpoints", icon: List, count: spec.endpoints.length },
    { id: "schemas", label: "Schemas", icon: Database, count: Object.keys(spec.schemas).length },
    { id: "info", label: "Metadata", icon: Info },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
            {tab.count !== undefined && <span className={styles.badge}>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {activeTab === "endpoints" && (
            <motion.div
              key="endpoints"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={styles.grid}
            >
              {spec.endpoints.map((ep, i) => (
                <EndpointCard key={`${ep.method}-${ep.path}-${i}`} endpoint={ep} />
              ))}
            </motion.div>
          )}

          {activeTab === "schemas" && (
            <motion.div
              key="schemas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={styles.stack}
            >
              {Object.entries(spec.schemas).map(([name, schema]) => (
                <SchemaCard key={name} name={name} schema={schema} />
              ))}
            </motion.div>
          )}

          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={styles.infoSection}
            >
              <div className={styles.infoCard}>
                <h2>{spec.info.title}</h2>
                <p className={styles.version}>Version: {spec.info.version}</p>
                <p className={styles.description}>{spec.info.description}</p>
                
                {spec.securitySchemes && (
                  <div className={styles.authBox}>
                    <h3><ShieldCheck size={18} /> Authentication Schemes</h3>
                    <pre className={styles.codeBlock}>
                      {JSON.stringify(spec.securitySchemes, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
