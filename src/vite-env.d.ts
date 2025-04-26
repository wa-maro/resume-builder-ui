/// <reference types="vite/client" />

declare global {
  export interface UserType {
    token: string;
    role: "user" | "admin";
  }
}

export {};
