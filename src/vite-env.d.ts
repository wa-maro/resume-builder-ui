/// <reference types="vite/client" />

declare global {
  export interface UserType {
    id: string;
    username: string;
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

  export interface PersonalInfo {
    id?: string;
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    placeOfDomicile: string;
    gender: string;
    email: string;
    phone: string;
    physicalAddress: string;
    disabilities: string;
    resumeId?: string;
  }

  export interface Referee {
    id?: string;
    fullName: string;
    position: string;
    organization: string;
    email: string;
    phone: string;
    physicalAddress: string;
    resumeId?: string;
  }

  export interface Skill {
    id?: string;
    category: string;
    name: string;
    proficiency: number;
    description: string;
    certification: string;
    resumeId?: string;
  }

  export interface Experience {
    id?: string;
    jobTitle: string;
    company: { name: string; location: string };
    responsibilities: string;
    currentlyWorking: boolean;
    startDate: string;
    endDate: string;
    resumeId?: string;
  }

  export interface Academic {
    id?: string;
    award: string;
    school: { name: string; location: string };
    startYear: string;
    endYear: string;
    grade: { division: string; points: string };
    uploadedCertificate: string;
    resumeId?: string;
  }

  export interface Profession {
    id?: string;
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
