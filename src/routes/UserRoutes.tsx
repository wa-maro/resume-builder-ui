import { Navigate, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PrintableResume from "../pages/users/PrintableResume";
import Templates from "../pages/users/Templates";
import TemplateDetails from "../pages/users/TemplateDetails";
import HowItWorks from "../pages/users/HowItWorks";
import SummaryAndDeclaration from "../features/sections/DeclarationStatement";
import Referees from "../features/sections/Referees";
import WorkExperiences from "../features/sections/WorkExperiences";
import Projects from "../features/sections/Projects";
import Skills from "../features/sections/Skills";
import AcademicQualifications from "../features/sections/AcademicQualifications";
import SchoolQualifications from "../features/sections/SchoolQualifications";
import Resume from "../pages/users/Resume";
import PersonalDetails from "../features/sections/PersonalInfo";
import ResumeProvider from "../context/resume/ResumeProvider";
import ResumeSectionGuard from "../context/resume/ResumeSectionGuard";
import ResumeLayout from "../layouts/ResumeLayout";
import Home from "../pages/users/Home";
import Contact from "../pages/Contact";
import { UserRoute } from "../context/ProtectedRoutes";

const UserRoutes = () => {
  return (
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />

      <Route
        path="resume"
        element={
          <UserRoute>
            <ResumeProvider>
              <ResumeLayout />
            </ResumeProvider>
          </UserRoute>
        }
      >
        <Route index element={<Resume />} />
        <Route element={<ResumeSectionGuard />}>
          <Route path="personal-information" element={<PersonalDetails />} />
          <Route path="education-background">
            <Route index element={<Navigate to="school-qualifications" />} />
            <Route
              path="school-qualifications"
              element={<SchoolQualifications />}
            />
            <Route
              path="academic-qualifications"
              element={<AcademicQualifications />}
            />
          </Route>
          <Route path="projects" element={<Projects />} />
          <Route path="work-experiences" element={<WorkExperiences />} />
          <Route path="skills" element={<Skills />} />
          <Route path="referees" element={<Referees />} />
          <Route
            path="summary-and-declaration"
            element={<SummaryAndDeclaration />}
          />
        </Route>
        <Route path="preview" element={<PrintableResume />} />
      </Route>

      <Route path="templates" element={<Templates />}>
        <Route
          path=":slug"
          element={
            <UserRoute>
              <TemplateDetails />
            </UserRoute>
          }
        />
      </Route>

      <Route path="how-it-works" element={<HowItWorks />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  );
};

export default UserRoutes;
