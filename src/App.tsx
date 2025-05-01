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
import PersonalDetails from "./features/sections/PersonalInfo";
import AcademicQualifications from "./features/sections/AcademicQualifications";
import ProfessionQualifications from "./features/sections/ProfessionQualifications";
import WorkExperiences from "./features/sections/WorkExperiences";
import Skills from "./features/sections/Skills";
import Referees from "./features/sections/Referees";
import SummaryAndDeclaration from "./features/sections/SummaryAndDeclaration";
import ResumeLayout from "./layouts/ResumeLayout";
import TemplateDetails from "./pages/TemplateDetails";
import ProtectedRoute from "./context/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";
import AuthProvider from "./context/authProvider";
import GuestRoute from "./context/GuestRoute";
import Resume from "./pages/Resume";
import ResumeSectionGuard from "./context/ResumeSectionGuard";

function App() {
  return (
    <AuthProvider>
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
              <Route index element={<Resume />} />
              <Route element={<ResumeSectionGuard />}>
                <Route
                  path="personal-information"
                  element={<PersonalDetails />}
                />
                <Route path="education-background">
                  <Route
                    index
                    element={<Navigate to="academic-qualifications" />}
                  />
                  <Route
                    path="academic-qualifications"
                    element={<AcademicQualifications />}
                  />
                  <Route
                    path="profession-qualifications"
                    element={<ProfessionQualifications />}
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

            <Route
              path="login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            <Route path="unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
