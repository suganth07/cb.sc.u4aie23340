declare module "logging-middleware" {
  export interface LogPayload {
    stack: "backend" | "frontend";
    level: "debug" | "info" | "warn" | "error" | "fatal";
    package: string;
    message: string;
  }

  export function Log(payload: LogPayload): Promise<void>;
}

export {};