export type StackType = "backend" | "frontend";

export type LevelType =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

export type BackendPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

export type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

export type CommonPackage =
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export type PackageType =
  | BackendPackage
  | FrontendPackage
  | CommonPackage;

export interface LogPayload {
  stack: StackType;
  level: LevelType;
  package: PackageType;
  message: string;
}