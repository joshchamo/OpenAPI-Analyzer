"use client";

import React from "react";
import styles from "./SchemaTable.module.css";

interface PropertyProps {
  name: string;
  property: any;
  required: boolean;
  level: number;
}

const PropertyRow: React.FC<PropertyProps> = ({ name, property, required, level }) => {
  const type = property.type || (property.$ref ? "object" : "any");
  const isObject = type === "object" && property.properties;
  const isArray = type === "array" && property.items;

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.nameCell} style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}>
          <span className={styles.name}>{name}</span>
          {required && <span className={styles.required}>*</span>}
        </td>
        <td className={styles.typeCell}>
          <span className={styles.typeBadge}>{type}</span>
          {property.format && <span className={styles.format}>({property.format})</span>}
        </td>
        <td className={styles.descCell}>
          {property.description || <span className={styles.noDesc}>No description provided.</span>}
          {property.enum && (
            <div className={styles.enumList}>
              <strong>Enum:</strong> {property.enum.join(", ")}
            </div>
          )}
        </td>
      </tr>
      {isObject && 
        Object.entries(property.properties).map(([propName, prop]: [string, any]) => (
          <PropertyRow 
            key={propName} 
            name={propName} 
            property={prop} 
            required={property.required?.includes(propName)} 
            level={level + 1} 
          />
        ))
      }
      {isArray && property.items.properties &&
        Object.entries(property.items.properties).map(([propName, prop]: [string, any]) => (
          <PropertyRow 
            key={propName} 
            name={`${propName}`} 
            property={prop} 
            required={property.items.required?.includes(propName)} 
            level={level + 1} 
          />
        ))
      }
    </>
  );
};

interface SchemaTableProps {
  schema: any;
}

export const SchemaTable: React.FC<SchemaTableProps> = ({ schema }) => {
  if (!schema.properties && !schema.items?.properties) {
    return (
      <pre className={styles.raw}>
        {JSON.stringify(schema, null, 2)}
      </pre>
    );
  }

  const properties = schema.properties || schema.items?.properties || {};
  const requiredFields = schema.required || schema.items?.required || [];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties).map(([name, prop]: [string, any]) => (
            <PropertyRow 
              key={name} 
              name={name} 
              property={prop} 
              required={requiredFields.includes(name)} 
              level={0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
