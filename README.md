# Resume Builder

A modern web application that allows users to build, customize, and export professional resumes tailored to the Tanzanian job market and education system.

## Project Overview

This project provides a simple and intuitive interface for users to manage all sections of their resume — including personal details, education, work experience, skills, certifications, referees, and a declaration section — with the ability to update and export to PDF.

The system supports user registration and authentication, enabling users to manage their own resume securely.

### Frontend Features

- User registration and login (JWT-based auth)
- Create, view, update, and delete:
  - Personal Details
  - Education Background
  - Work Experience
  - Skills and Certifications
  - Referees
  - Declaration & Signature
- Support for multiple entries (education, experience, etc.)
- PDF Export (coming soon)
- Responsive and mobile-friendly SPA (Single Page Application)

### Tech Stack (Frontend)

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API (or other, if you're using one)
- **Form Handling:** React Hook Form + Yup (if applicable)
- **API Communication:** Axios or Fetch
- **PDF Export (planned):** html2pdf.js or react-pdf

### Project Structure (basic)

```bash
src/
├── assets/            # Static files (images, logos, etc.)
├── components/        # Reusable UI components
├── features/          # Feature-based folders (e.g., education, work, personal)
│   ├── Education/
│   ├── Experience/
│   └── ...
├── layouts/           # Page layouts (e.g., AuthLayout, MainLayout)
├── pages/             # Route-level components (e.g., Home, Login, ResumeEditor)
├── services/          # API service functions (e.g., authService, resumeService)
├── utils/             # Utility functions and helpers
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── router/            # React Router config
```
