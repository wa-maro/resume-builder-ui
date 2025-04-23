/// <reference types="vite/client" />

declare global {
  export interface RegisterType {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }

  export interface LoginType {
    username: string;
    password: string;
  }
}

export {};
