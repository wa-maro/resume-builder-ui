import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Resumes from "../pages/admin/resumes/Resumes";
import Templates from "../pages/admin/Templates";
import Messages from "../pages/admin/messages/Messages";
import { AdminRoute } from "../context/ProtectedRoutes";
import Userdetails from "../pages/admin/users/Userdetails";
import ResumeDetails from "../pages/admin/resumes/ResumeDetails";
import Referees from "../pages/admin/sections/Referees";
import Skills from "../pages/admin/sections/Skills";
import Projects from "../pages/admin/sections/Projects";
import WorkExperiences from "../pages/admin/sections/WorkExperiences";
import PersonalInformations from "../pages/admin/sections/PersonalInformations";
import Users from "../pages/admin/users/Users";
import PersonalInfoDetails from "../pages/admin/sections/PersonalInfoDetails";
import ProjectDetails from "../pages/admin/sections/ProjectDetails";
import SkillDetails from "../pages/admin/sections/SkillDetails";
import RefereeDetails from "../pages/admin/sections/RefereeDetails";
import WorkExperienceDetails from "../pages/admin/sections/WorkExperienceDetails";
import Schools from "../pages/admin/sections/Schools";
import SchoolDetails from "../pages/admin/sections/SchoolDetails";
import Academics from "../pages/admin/sections/Academics";
import AcademicDetails from "../pages/admin/sections/AcademicDetails";
import FAQs from "../pages/admin/faqs/FAQs";
import FAQDetails from "../pages/admin/faqs/FAQDetails";
import MessageDetails from "../pages/admin/messages/MessageDetails";

export default function AdminRoutes() {
  return (
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<Dashboard />} />

      <Route path="users">
        <Route index element={<Users />} />
        <Route path=":username" element={<Userdetails />} />
      </Route>

      <Route path="resumes">
        <Route index element={<Resumes />} />
        <Route path=":id" element={<ResumeDetails />} />
      </Route>

      <Route path="sections">
        <Route
          index
          element={<Navigate to="personal-informations" replace />}
        />

        <Route path="personal-informations">
          <Route index element={<PersonalInformations />} />
          <Route path=":id" element={<PersonalInfoDetails />} />
        </Route>

        <Route path="school-qualifications">
          <Route index element={<Schools />} />
          <Route path=":id" element={<SchoolDetails />} />
        </Route>

        <Route path="academic-qualifications">
          <Route index element={<Academics />} />
          <Route path=":id" element={<AcademicDetails />} />
        </Route>

        <Route path="projects">
          <Route index element={<Projects />} />
          <Route path=":id" element={<ProjectDetails />} />
        </Route>

        <Route path="work-experiences">
          <Route index element={<WorkExperiences />} />
          <Route path=":id" element={<WorkExperienceDetails />} />
        </Route>

        <Route path="skills">
          <Route index element={<Skills />} />
          <Route path=":id" element={<SkillDetails />} />
        </Route>

        <Route path="referees">
          <Route index element={<Referees />} />
          <Route path=":id" element={<RefereeDetails />} />
        </Route>
      </Route>

      <Route path="templates" element={<Templates />} />

      <Route path="system">
        <Route path="faqs">
          <Route index element={<FAQs />} />
          <Route path=":id" element={<FAQDetails />} />
        </Route>

        <Route path="messages">
          <Route index element={<Messages />} />
          <Route path="new" element={<Messages />} />
          <Route path=":id" element={<MessageDetails />} />
        </Route>
      </Route>
    </Route>
  );
}
