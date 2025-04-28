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

  export interface LoginType {
    usernameOrEmail: string;
    password: string;
  }

  export interface Person {
    _id?: string;
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    placeOfDomicile: string;
    sex: string;
    email: string;
    phone: string;
    physicalAddress: string;
    disabilities?: string;
    resumeId?: string;
  }

  export interface Reference {
    _id?: string;
    fullName: string;
    position: string;
    organization: string;
    email: string;
    phone?: string;
    physicalAddress: string;
    resumeId?: string;
  }

  export interface Skill {
    _id?: string;
    category: string;
    name: string;
    proficiency: number;
    description?: string;
    certification?: string;
    resumeId?: string;
  }

  export interface Experience {
    _id?: string;
    jobTitle: string;
    company: { name: string; location: string };
    responsibilities: string;
    currentlyWorking: boolean;
    startDate: string;
    endDate?: string;
    resumeId?: string;
  }

  export interface School {
    _id?: string;
    award: string;
    institution: { name: string; location: string };
    startYear: string;
    endYear: string;
    grade: { division: string; points: string };
    uploadedCertificate: string;
    resumeId?: string;
  }

  export interface Academic {
    _id?: string;
    award: string;
    institution: { name: string; location: string };
    startYear: string;
    endYear: string;
    uploadedCertificate: string;
    uploadedTranscript: string;
    grade: { classification: string; gpa: string };
    resumeId?: string;
  }
}

export {};
