"use client";

import React from "react";
import styles from "./SchemaCard.module.css";

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
        
        {schema.properties && (
          <div className={styles.properties}>
            {Object.entries(schema.properties).map(([propName, prop]: [string, any]) => (
              <div key={propName} className={styles.property}>
                <div className={styles.propHeader}>
                  <span className={styles.propName}>{propName}</span>
                  <span className={styles.propType}>{prop.type || "any"}</span>
                  {schema.required?.includes(propName) && (
                    <span className={styles.required}>*</span>
                  )}
                </div>
                {prop.description && <p className={styles.propDesc}>{prop.description}</p>}
              </div>
            ))}
          </div>
        )}

        {!schema.properties && (
          <pre className={styles.raw}>
            {JSON.stringify(schema, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
