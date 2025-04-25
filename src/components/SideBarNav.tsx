import SideNavItem from "./SideNavItem";

const navItems = [
  { label: "Personal Info", to: "personal-info" },
  {
    label: "Education",
    children: [
      {
        label: "School Qualifications",
        to: "education-background/school-qualifications",
      },
      {
        label: "Academic Qualifications",
        to: "education-background/academic-qualifications",
      },
    ],
  },
  { label: "Experience", to: "work-experience" },
  { label: "Skill", to: "skills" },
  { label: "Referee", to: "referees" },
  { label: "Summary & Declaration", to: "summary-and-declaration" },
];

const SideBarNav = () => {
  return (
    <nav>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <SideNavItem key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBarNav;
