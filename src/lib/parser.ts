import { dereference, OpenAPI } from "@readme/openapi-parser";
import { AnalyzedSpec, EndpointInfo, ParameterInfo, ResponseInfo } from "./types";

export async function parseOpenApiSpec(url: string): Promise<AnalyzedSpec> {
  try {
    // Use the proxy to avoid CORS issues
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch spec through proxy");
    }
    
    const spec = await response.json();
    
    // Dereference the spec object
    const api = await dereference(spec);
    
    return transformSpec(api);
  } catch (error) {
    console.error("Error parsing OpenAPI spec:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to parse spec");
  }
}

function transformSpec(api: OpenAPI.Document): AnalyzedSpec {
  const endpoints: EndpointInfo[] = [];
  
  if (api.paths) {
    Object.entries(api.paths).forEach(([path, pathItem]) => {
      if (!pathItem) return;
      
      const methods = ["get", "post", "put", "delete", "patch", "options", "head"];
      
      methods.forEach((method) => {
        const operation = (pathItem as any)[method];
        if (operation) {
          const parameters: ParameterInfo[] = (operation.parameters || []).map((p: any) => ({
            name: p.name,
            in: p.in,
            description: p.description,
            required: p.required,
            schema: p.schema,
          }));

          // Include path-level parameters
          if (pathItem.parameters) {
            pathItem.parameters.forEach((p: any) => {
              if (!parameters.find(existing => existing.name === p.name && existing.in === p.in)) {
                parameters.push({
                  name: p.name,
                  in: p.in,
                  description: p.description,
                  required: p.required,
                  schema: p.schema,
                });
              }
            });
          }

          const responses: ResponseInfo[] = Object.entries(operation.responses || {}).map(([code, res]: [string, any]) => ({
            code,
            description: res.description,
            content: res.content,
          }));

          endpoints.push({
            path,
            method: method.toUpperCase(),
            summary: operation.summary,
            description: operation.description,
            operationId: operation.operationId,
            parameters,
            requestBody: operation.requestBody,
            responses,
          });
        }
      });
    });
  }

  const schemas = (api as any).components?.schemas || (api as any).definitions || {};
  const securitySchemes = (api as any).components?.securitySchemes || (api as any).securityDefinitions;

  return {
    info: api.info,
    version: (api as any).openapi || (api as any).swagger || "unknown",
    endpoints,
    schemas,
    securitySchemes,
  };
}
