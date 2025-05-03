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

  export type Disability =
    | "none"
    | "visual"
    | "hearing"
    | "mobility"
    | "cognitive"
    | "other";

  export interface PersonalInfo {
    _id?: string;
    fullName: string;
    nationality: string;
    dateOfBirth: string; // Format: DD/MM/YYYY
    placeOfDomicile?: string;
    gender: "male" | "female";
    email?: string;
    phone?: string;
    physicalAddress: string;
    disabilities?: (
      | "none"
      | "visual"
      | "hearing"
      | "mobility"
      | "cognitive"
      | "other"
    )[];
    maritualStatus?: "single" | "married" | "divorced" | "widowed";
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

  export interface Declaration {
    statement: string;
    signature: string;
    date: string; // format: DD/MM/YYYY
  }

  export interface Resume {
    _id?: string;
    user?: string;
    title: string;
    summary: string;
    declaration?: Declaration;
    createdAt?: string;
    updatedAt?: string;
  }

  interface FetchResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
  }
}

export {};
