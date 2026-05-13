import { OpenAPIV3, OpenAPIV3_1, OpenAPIV2 } from "openapi-types";

export type SpecInfo = OpenAPIV3.InfoObject | OpenAPIV3_1.InfoObject | OpenAPIV2.InfoObject;

export interface AnalyzedSpec {
  info: SpecInfo;
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
