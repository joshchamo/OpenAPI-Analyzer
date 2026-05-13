"use client";

import React, { useState } from "react";
import { EndpointInfo } from "@/lib/types";
import { ChevronDown, ChevronUp, Tag, Box, AlertCircle } from "lucide-react";
import styles from "./EndpointCard.module.css";
import { motion } from "framer-motion";

interface EndpointCardProps {
  endpoint: EndpointInfo;
}

export const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET": return "#10b981";
      case "POST": return "#3b82f6";
      case "PUT": return "#f59e0b";
      case "DELETE": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span 
          className={styles.method} 
          style={{ backgroundColor: getMethodColor(endpoint.method) }}
        >
          {endpoint.method}
        </span>
        <span className={styles.path}>{endpoint.path}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      
      {endpoint.summary && <p className={styles.summary}>{endpoint.summary}</p>}

      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className={styles.details}
        >
          {endpoint.parameters.length > 0 && (
            <div className={styles.section}>
              <h4>Parameters</h4>
              <div className={styles.paramList}>
                {endpoint.parameters.map((p, i) => (
                  <div key={i} className={styles.paramItem}>
                    <div className={styles.paramHeader}>
                      <strong>{p.name}</strong>
                      <span className={styles.paramIn}>{p.in}</span>
                      {p.required && <span className={styles.required}>required</span>}
                    </div>
                    {p.description && <p className={styles.paramDesc}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div className={styles.section}>
              <h4>Request Body</h4>
              <pre className={styles.code}>
                {JSON.stringify(endpoint.requestBody, null, 2)}
              </pre>
            </div>
          )}

          <div className={styles.section}>
            <h4>Responses</h4>
            <div className={styles.responseList}>
              {endpoint.responses.map((r, i) => (
                <div key={i} className={styles.responseItem}>
                  <span className={`${styles.status} ${r.code.startsWith('2') ? styles.success : styles.error}`}>
                    {r.code}
                  </span>
                  <span className={styles.responseDesc}>{r.description}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
