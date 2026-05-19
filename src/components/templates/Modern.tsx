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

export default function Modern({ preview }: Props) {
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
    <div className="px-4 font-sans leading-relaxed max-w-5xl mx-auto bg-white text-gray-900">
      <header className="flex flex-col items-center text-center border-b border-gray-300 pb-6 mb-6">
        <AvatarUploader avatarUrl={preview.avatar} />

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {personalInfo?.fullName}
          </h1>
          <p className="text-gray-600 mt-1">{t(`${preview.title}`)}</p>
          <div className="text-sm text-gray-500 mt-2 space-x-2">
            <a href={`mailto:${personalInfo?.email}`}>{personalInfo?.email}</a>{" "}
            <span>|</span>
            <a href={`tel:${personalInfo?.phone}`}>
              {personalInfo?.phone}
            </a>{" "}
            <span>|</span>
            <span>{personalInfo?.physicalAddress}</span>
          </div>
        </div>
      </header>

      <SummarySection summary={preview.summary} variant="modern" />
      <PersonalInfoSection personalInfo={personalInfo} variant="modern" />
      <EducationSection
        schools={educationBackground?.schoolQualifications || []}
        academics={educationBackground?.academicQualifications || []}
        variant="modern"
      />
      <ProjectSection projects={projects || []} variant="modern" />
      <WorkExperienceSection
        experiences={workExperiences || []}
        variant="modern"
      />
      <SkillSection skills={skills || []} variant="modern" />
      <RefereeSection referees={referees?.slice(0, 3) || []} variant="modern" />
      {preview.declaration && (
        <DeclarationSection
          declaration={preview.declaration}
          variant="modern"
        />
      )}
    </div>
  );
}
