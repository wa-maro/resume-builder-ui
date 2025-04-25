import SideNavItem from "./SideNavItem";

const navItems = [
  { label: "Personal Information", to: "personal-information" },
  {
    label: "Education Background",
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
  { label: "Work Experiences", to: "work-experiences" },
  { label: "Skills", to: "skills" },
  { label: "Referees", to: "referees" },
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
