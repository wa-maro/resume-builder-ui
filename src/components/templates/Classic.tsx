import { useTranslation } from "react-i18next";
import { AvatarUploader } from "../AvatarUploader";
import SummarySection from "./sections/SummarySection";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProjectSection from "./sections/ProjectSection";
import WorkExperienceSection from "./sections/WorkExperienceSection";
import DeclarationSection from "./sections/DeclarationSection";
import RefereeSection from "./sections/RefereeSection";
import SkillSection from "./sections/SkillSection";
import EducationSection from "./sections/EducationSection";
interface Props {
  preview: ResumePreview;
}

export default function Classic({ preview }: Props) {
  const { t } = useTranslation();
  const {
    personalInfo,
    educationBackground,
    projects,
    workExperiences,
    skills,
    referees,
  } = preview.sections;

  return (
    <div className="px-4 leading-relaxed max-w-5xl mx-auto bg-white text-black">
      <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <AvatarUploader avatarUrl={preview.avatar} />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t(`${preview.title}`)}
          </h1>

          <SummarySection summary={preview.summary} variant="classic" />
        </div>
      </header>
      <PersonalInfoSection personalInfo={personalInfo} variant="classic" />
      <EducationSection
        schools={educationBackground?.schoolQualifications || []}
        academics={educationBackground?.academicQualifications || []}
        variant="classic"
      />
      <ProjectSection projects={projects || []} variant="classic" />
      <WorkExperienceSection
        experiences={workExperiences || []}
        variant="classic"
      />
      <SkillSection skills={skills || []} variant="classic" />
      <RefereeSection
        referees={referees?.slice(0, 3) || []}
        variant="classic"
      />
      {preview.declaration && (
        <DeclarationSection declaration={preview.declaration} />
      )}
    </div>
  );
}
