import { CheckIcon, AlertCircle, Circle } from "lucide-react";

type StepStatus = "completed" | "incomplete" | "not_started";

interface Step {
  label: string;
  step: string;
  status: StepStatus;
}

const steps: Step[] = [
  { label: "Personal Information", step: "Step One", status: "completed" },
  { label: "Education Background", step: "Step Two", status: "completed" },
  { label: "Work Experience", step: "Step Three", status: "incomplete" },
  { label: "Skills", step: "Step Four", status: "not_started" },
  { label: "Referees", step: "Step Five", status: "not_started" },
  { label: "Summary", step: "Step Six", status: "not_started" },
  { label: "Review", step: "Step Seven", status: "not_started" },
];

const statusStyles: Record<
  StepStatus,
  {
    icon: React.ElementType;
    iconColor: string;
    borderColor: string;
    labelColor: string;
  }
> = {
  completed: {
    icon: CheckIcon,
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-600",
    labelColor: "text-emerald-800",
  },
  incomplete: {
    icon: AlertCircle,
    iconColor: "text-yellow-500",
    borderColor: "border-yellow-500",
    labelColor: "text-yellow-700",
  },
  not_started: {
    icon: Circle,
    iconColor: "text-gray-400",
    borderColor: "border-gray-300",
    labelColor: "text-gray-500",
  },
};

function ProgressBar() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {steps.map((step, index) => {
        const {
          icon: Icon,
          iconColor,
          borderColor,
          labelColor,
        } = statusStyles[step.status];

        return (
          <li
            key={index}
            className="flex items-center gap-2 text-sm font-medium p-2"
          >
            <div
              className={`w-8 h-8 rounded-md border flex items-center justify-center flex-none shrink-0 ${iconColor} ${borderColor}`}
            >
              <Icon size={16} />
            </div>
            <div className="flex flex-col text-start">
              <h4 className={`text-nowrap ${labelColor}`}>{step.label}</h4>
              <span className="text-xs text-gray-400 font-normal">
                {step.step}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ProgressBar;
