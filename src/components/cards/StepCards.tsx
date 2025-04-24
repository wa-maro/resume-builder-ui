import { UserPlus, LayoutTemplate, Edit3, Download } from "lucide-react";
import GridWrapper from "./GridWrapper";

const steps = [
  {
    number: 1,
    title: "Create Account",
    description:
      "Sign up to save your progress and access your resume anytime.",
    icon: <UserPlus className="w-4 h-4 text-teal-700" />,
  },
  {
    number: 2,
    title: "Pick a Template",
    description:
      "Choose from a variety of modern, job-ready resume templates designed to impress.",
    icon: <LayoutTemplate className="w-4 h-4 text-teal-700" />,
  },
  {
    number: 3,
    title: "Customization",
    description:
      "Fill in your details, add your experience, education, and skills — we’ll guide you step by step.",
    icon: <Edit3 className="w-4 h-4 text-teal-700" />,
  },
  {
    number: 4,
    title: "Review & Download",
    description:
      "Preview your resume, make final tweaks, and download it in PDF format — ready to send to employers.",
    icon: <Download className="w-4 h-4 text-teal-700" />,
  },
];

const StepCards = () => (
  <GridWrapper>
    {steps.map(({ icon, number, title, description }) => (
      <article
        key={number}
        className="shadow-md rounded-xl p-8 hover:shadow-lg transition-transform hover:-translate-y-1"
      >
        <div className="flex gap-2">
          <span className="w-8 h-8 rounded-full border border-teal-700 flex items-center justify-center">
            {icon}
          </span>

          <div className="flex-1">
            <h3 className="font-medium text-teal-700">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </article>
    ))}
  </GridWrapper>
);

export default StepCards;
