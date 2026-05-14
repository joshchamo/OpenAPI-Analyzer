"use client";

import React, { useState, useMemo } from "react";
import { AnalyzedSpec, EndpointInfo } from "@/lib/types";
import { EndpointCard } from "./EndpointCard";
import { SchemaCard } from "./SchemaCard";
import { Info, List, Database, ShieldCheck, Search, ChevronDown, ChevronUp, Folder } from "lucide-react";
import styles from "./Dashboard.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardProps {
  spec: AnalyzedSpec;
}

const TagGroup: React.FC<{ tag: string; endpoints: EndpointInfo[]; defaultOpen?: boolean }> = ({ 
  tag, 
  endpoints, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.tagGroup}>
      <button className={styles.tagHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.tagLabel}>
          <Folder size={18} className={styles.folderIcon} />
          <h3>{tag}</h3>
          <span className={styles.tagCount}>{endpoints.length}</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.tagContent}
          >
            <div className={styles.grid}>
              {endpoints.map((ep, i) => (
                <EndpointCard key={`${ep.method}-${ep.path}-${i}`} endpoint={ep} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ spec }) => {
  const [activeTab, setActiveTab] = useState<"endpoints" | "schemas" | "info">("endpoints");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return spec.endpoints;
    const q = searchQuery.toLowerCase();
    return spec.endpoints.filter(ep => 
      ep.path.toLowerCase().includes(q) ||
      ep.method.toLowerCase().includes(q) ||
      ep.summary?.toLowerCase().includes(q) ||
      ep.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [spec.endpoints, searchQuery]);

  const groupedEndpoints = useMemo(() => {
    const groups: Record<string, EndpointInfo[]> = {};
    filteredEndpoints.forEach(ep => {
      ep.tags.forEach(tag => {
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push(ep);
      });
    });
    // Sort tags alphabetically
    return Object.keys(groups).sort().reduce((obj, key) => {
      obj[key] = groups[key];
      return obj;
    }, {} as Record<string, EndpointInfo[]>);
  }, [filteredEndpoints]);

  const filteredSchemas = useMemo(() => {
    if (!searchQuery.trim()) return Object.entries(spec.schemas);
    const q = searchQuery.toLowerCase();
    return Object.entries(spec.schemas).filter(([name]) => 
      name.toLowerCase().includes(q)
    );
  }, [spec.schemas, searchQuery]);

  const tabs = [
    { id: "endpoints", label: "Endpoints", icon: List, count: filteredEndpoints.length },
    { id: "schemas", label: "Schemas", icon: Database, count: filteredSchemas.length },
    { id: "info", label: "Metadata", icon: Info },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
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

        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {activeTab === "endpoints" && (
            <motion.div
              key="endpoints"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={styles.endpointList}
            >
              {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
                <TagGroup 
                  key={tag} 
                  tag={tag} 
                  endpoints={endpoints} 
                  defaultOpen={searchQuery.length > 0} 
                />
              ))}
              {filteredEndpoints.length === 0 && (
                <div className={styles.emptyResults}>
                  <p>No endpoints found matching "{searchQuery}"</p>
                </div>
              )}
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
              {filteredSchemas.map(([name, schema]) => (
                <SchemaCard key={name} name={name} schema={schema} />
              ))}
              {filteredSchemas.length === 0 && (
                <div className={styles.emptyResults}>
                  <p>No schemas found matching "{searchQuery}"</p>
                </div>
              )}
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
