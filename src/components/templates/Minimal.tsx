import { useTranslation } from "react-i18next";
import { AvatarUploader } from "../AvatarUploader";
import SummarySection from "./sections/SummarySection";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProjectSection from "./sections/ProjectSection";
import DeclarationSection from "./sections/DeclarationSection";
import RefereeSection from "./sections/RefereeSection";
import EducationSection from "./sections/EducationSection";

interface Props {
  preview: ResumePreview;
}

export default function Minimal({ preview }: Props) {
  const { t } = useTranslation();
  const { personalInfo, educationBackground, projects, referees } =
    preview.sections;

  return (
    <div className="px-4 max-w-5xl mx-auto bg-white text-black">
      <header className="flex items-center border-b border-gray-300 gap-6 pb-4">
        <AvatarUploader avatarUrl={preview.avatar} />

        <div className="flex-1 text-center md:text-left space-y-1 text-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo?.fullName}
          </h1>
          <p className="text-gray-600 text-base font-semibold">
            {t(`${preview.title}`)}
          </p>
          <p className="text-gray-500">{personalInfo?.physicalAddress}</p>
        </div>
      </header>

      <SummarySection summary={preview.summary} variant="minimal" />
      <PersonalInfoSection personalInfo={personalInfo} variant="minimal" />
      <EducationSection
        schools={educationBackground?.schoolQualifications || []}
        variant="minimal"
      />
      <ProjectSection projects={projects || []} variant="minimal" />
      <RefereeSection
        referees={referees?.slice(0, 3) || []}
        variant="minimal"
      />
      {preview.declaration && (
        <DeclarationSection declaration={preview.declaration} />
      )}
    </div>
  );
}
