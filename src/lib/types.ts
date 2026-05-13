import { OpenAPI } from "@readme/openapi-parser";

export interface AnalyzedSpec {
  info: OpenAPI.Document["info"];
  version: string;
  endpoints: EndpointInfo[];
  schemas: Record<string, any>;
  securitySchemes?: Record<string, any>;
}

export interface EndpointInfo {
  path: string;
  method: string;
  summary?: string;
  description?: string;
  operationId?: string;
  parameters: ParameterInfo[];
  requestBody?: any;
  responses: ResponseInfo[];
}

export interface ParameterInfo {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  description?: string;
  required?: boolean;
  schema?: any;
}

export interface ResponseInfo {
  code: string;
  description?: string;
  content?: Record<string, any>;
}
