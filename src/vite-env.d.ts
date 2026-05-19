/// <reference types="vite/client" />

declare global {
  export interface UserType {
    id: string;
    username: string;
    role: "user" | "admin";
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
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
    resume?: string;
    fullName: string;
    gender: "male" | "female" | "";
    dateOfBirth: string; // Format: DD/MM/YYYY
    nationality: string;
    placeOfDomicile?: string;
    maritualStatus?: "single" | "married" | "divorced" | "widowed" | "";
    disabilities?: (
      | "none"
      | "visual"
      | "hearing"
      | "mobility"
      | "cognitive"
      | "other"
    )[];
    email?: string;
    phone?: string;
    physicalAddress: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface Referee {
    _id?: string;
    fullName: string;
    position: string;
    organization: string;
    email: string;
    phone: string;
    physicalAddress: string;
    resume?: string;
  }

  export interface Skill {
    _id?: string;
    category: "personal" | "professional" | "";
    name: string;
    proficiency: number;
    description?: string;
    resume?: string;
    certificate?: FIle | string;
  }

  export interface Project {
    _id?: string;
    title: string;
    description: string;
    image: File | string;
    socialLinks?: string[];
    tools?: string[];
    resume?: string;
  }

  export interface CompanyInfo {
    name: string;
    location: string;
  }

  export interface Experience {
    _id?: string;
    position: string;
    company: CompanyInfo;
    responsibilities: string;
    currentlyWorking: boolean;
    startDate: string;
    endDate?: string;
    resume?: string;
  }

  // 🎓 School Qualification
  export type SchoolLevel = "Primary" | "O-Level" | "A-Level" | "";
  export type SchoolCertificate =
    | "Primary School Leaving Examination (PSLE)"
    | "The Certificate of Secondary Education Examination (CSEE)"
    | "Advanced Certificate of Secondary Education Examination (ACSEE)"
    | "";
  export type GradeDivision = "I" | "II" | "III" | "IV" | "0" | "";

  export interface SchoolInfo {
    name: string;
    location: string;
  }

  export interface SchoolGrade {
    division?: GradeDivision;
    points?: string;
  }

  export interface School {
    _id?: string;
    level: SchoolLevel;
    award: SchoolCertificate;
    school: SchoolInfo;
    startYear: number | string;
    endYear: number | string;
    grade?: SchoolGrade;
    resume?: string;
    certificate?: FIle | string;
  }

  // 🎓 Academic Qualification
  export type AcademicLevel =
    | "Diploma"
    | "Advanced Diploma"
    | "Bachelor's"
    | "Postgraduate Diploma"
    | "Master's"
    | "Doctorate (PhD)"
    | "";

  export type AcademicClassification =
    | "First Class"
    | "Upper Second"
    | "Lower Second"
    | "Pass"
    | "Fail"
    | "";

  export interface AcademicGrade {
    classification: AcademicClassification;
    gpa: number | string; // 1.0 - 5.0 (step 0.1)
  }

  export interface InstitutionInfo {
    name: string;
    location: string;
  }

  export interface Academic {
    _id?: string;
    level: AcademicLevel;
    award: string; // e.g., "Bachelor of Science"
    institution: InstitutionInfo;
    startYear: number | string;
    endYear: number | string;
    grade: AcademicGrade;
    resume?: string;
    certificate?: FIle | string;
    transcript?: FIle | string;
  }

  export interface Declaration {
    statement: string;
    signature?: string;
    date: string;
  }

  export interface Resume {
    _id?: string;
    title: string;
    summary: string;
    declaration?: Declaration;
    avatar?: File | string;
    user?: string;
  }

  export interface ResumePreview {
    _id: string;
    user: string;
    title: string;
    summary: string;
    avatar: string;
    declaration?: Declaration;
    createdAt: string;
    updatedAt: string;
    sections: {
      personalInfo?: PersonalInfo | null;
      educationBackground?: {
        _id: string;
        resume: string;
        schoolQualifications: School[];
        academicQualifications: Academic[];
      } | null;
      projects: Project[];
      workExperiences: Experience[];
      skills: Skill[];
      referees: Referee[];
    };
  }

  export type VARIANT =
    | "minimal"
    | "classic"
    | "modern"
    | "card"
    | "cards"
    | "grid"
    | "list"
    | "timeline"
    | "progress"
    | "inline";

  interface TemplateProps {
    preview: ResumePreview;
  }

  interface FetchResponse<T = unknown> {
    success: boolean;
    message: string;
    errors?: {
      message: string;
    }[];
    data?: T;
  }

  interface ResumePreviewResponse extends FetchResponse<ResumePreview> {}

  interface Alert {
    success: boolean;
    messages: string[];
  }

  export interface FileData {
    id: string;
    name: string;
    type: "image" | "pdf";
    file: Blob;
    purpose: string;
    createdAt: number;
  }

  export interface FAQ {
    _id?: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface Message {
    _id?: string;
    name: string;
    email: string;
    message: string;
    reply: string;
    isReplied: boolean;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
}

export {};
