"use client";

import React from "react";
import styles from "./SchemaCard.module.css";
import { SchemaTable } from "./SchemaTable";

interface SchemaCardProps {
  name: string;
  schema: any;
}

export const SchemaCard: React.FC<SchemaCardProps> = ({ name, schema }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.type}>{schema.type || "object"}</span>
      </div>
      <div className={styles.body}>
        {schema.description && <p className={styles.description}>{schema.description}</p>}
        <SchemaTable schema={schema} />
      </div>
    </div>
  );
};
