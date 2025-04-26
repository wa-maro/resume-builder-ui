import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import PersonalDetails from "./features/sections/PersonalDetails";
import SchoolQualifications from "./features/sections/SchoolQualifications";
import AcademicQualifications from "./features/sections/AcademicQualifications";
import WorkExperiences from "./features/sections/WorkExperiences";
import Skills from "./features/sections/Skills";
import Referees from "./features/sections/Referees";
import SummaryAndDeclaration from "./features/sections/SummaryAndDeclaration";
import ResumeLayout from "./layouts/ResumeLayout";
import TemplateDetails from "./pages/TemplateDetails";
import ProtectedRoute from "./context/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />

          <Route
            path="resume"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <ResumeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="personal-information" />} />
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
            <Route path="work-experiences" element={<WorkExperiences />} />
            <Route path="skills" element={<Skills />} />
            <Route path="referees" element={<Referees />} />
            <Route
              path="summary-and-declaration"
              element={<SummaryAndDeclaration />}
            />
          </Route>

          <Route path="templates" element={<Templates />}>
            <Route
              path=":slug"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <TemplateDetails />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="contact" element={<Contact />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
