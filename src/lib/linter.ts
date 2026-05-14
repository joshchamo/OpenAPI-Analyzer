import { AnalyzedSpec, QualityIssue, QualityReport } from "./types";

export function generateQualityReport(spec: AnalyzedSpec): QualityReport {
  const issues: QualityIssue[] = [];

  // 1. Info Metadata Checks
  if (!spec.info.title) {
    issues.push({
      severity: "error",
      category: "Documentation",
      message: "API Title is missing",
      location: "info.title"
    });
  }
  if (!spec.info.description) {
    issues.push({
      severity: "warning",
      category: "Documentation",
      message: "API Description is missing",
      location: "info.description"
    });
  }

  // 2. Endpoints Checks
  spec.endpoints.forEach(ep => {
    const loc = `${ep.method} ${ep.path}`;

    if (!ep.summary && !ep.description) {
      issues.push({
        severity: "warning",
        category: "Documentation",
        message: "Endpoint missing both summary and description",
        location: loc
      });
    }

    const hasExplicitSuccess = ep.responses.some(r => r.code.startsWith("2"));
    const hasDefault = ep.responses.some(r => r.code === "default");

    if (!hasExplicitSuccess && !hasDefault) {
      const foundCodes = ep.responses.map(r => r.code).join(", ");
      issues.push({
        severity: "error",
        category: "Best Practice",
        message: `No success response defined (missing 2xx and 'default'). Found: ${foundCodes || "None"}`,
        location: loc
      });
    } else if (!hasExplicitSuccess && hasDefault) {
      issues.push({
        severity: "info",
        category: "Best Practice",
        message: "Endpoint uses 'default' response for success (explicit 2xx is preferred)",
        location: loc
      });
    }

    const hasExplicitError = ep.responses.some(r => r.code.startsWith("4") || r.code.startsWith("5"));
    if (!hasExplicitError && !hasDefault) {
      issues.push({
        severity: "info",
        category: "Best Practice",
        message: "No error responses (4xx/5xx) defined",
        location: loc
      });
    }

    if (!ep.operationId) {
      issues.push({
        severity: "info",
        category: "Best Practice",
        message: "Missing operationId (affects SDK generation)",
        location: loc
      });
    }

    // Parameter checks
    ep.parameters.forEach(p => {
      if (!p.description) {
        issues.push({
          severity: "warning",
          category: "Documentation",
          message: `Parameter '${p.name}' is missing a description`,
          location: loc
        });
      }
    });
  });

  // 3. Schema Checks
  Object.entries(spec.schemas).forEach(([name, schema]) => {
    const loc = `schemas.${name}`;
    if (!schema.description) {
      issues.push({
        severity: "info",
        category: "Documentation",
        message: `Schema '${name}' is missing a description`,
        location: loc
      });
    }

    if (schema.properties) {
      Object.entries(schema.properties).forEach(([propName, prop]: [string, any]) => {
        if (!prop.description && !prop.$ref) {
          issues.push({
            severity: "info",
            category: "Documentation",
            message: `Property '${propName}' in schema '${name}' missing description`,
            location: loc
          });
        }
      });
    }
  });

  // Calculate Score (Simple weighted logic)
  const errors = issues.filter(i => i.severity === "error").length;
  const warnings = issues.filter(i => i.severity === "warning").length;
  const info = issues.filter(i => i.severity === "info").length;

  // Base score 100, deduct for issues
  let score = 100 - (errors * 10) - (warnings * 2) - (info * 0.5);
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    issues,
    stats: { errors, warnings, info }
  };
}
