import SideNavItem from "./SideNavItem";
import { useTranslation } from "react-i18next";

const SideBarNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("personal_information"), to: "personal-information" },
    {
      label: t("education_background"),
      children: [
        {
          label: t("school_qualifications"),
          to: "education-background/school-qualifications",
        },
        {
          label: t("academic_qualifications"),
          to: "education-background/academic-qualifications",
        },
      ],
    },
    { label: t("projects"), to: "projects" },
    { label: t("work_experiences"), to: "work-experiences" },
    { label: t("skills"), to: "skills" },
    { label: t("referees"), to: "referees" },
    { label: t("summary_and_declaration"), to: "summary-and-declaration" },
    { label: t("preview_and_export"), to: "preview" },
  ];

  return (
    <nav>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <SideNavItem key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBarNav;
