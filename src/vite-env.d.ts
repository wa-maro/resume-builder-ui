/// <reference types="vite/client" />

declare global {
  export interface UserType {
    token: string;
    role: "user" | "admin";
  }

  export interface RegisterType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
}

export {};
