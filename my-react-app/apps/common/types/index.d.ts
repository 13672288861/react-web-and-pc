/// <reference types="vite/client" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

const DSCONF: any
// type routeTypes = import('react-router/dist/lib/context').RouteObject
type routeTypes = import('react-router/dist/lib/context').RouteObject
type ReactNode = import('react').ReactNode