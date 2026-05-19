import { useTranslation } from "react-i18next";

interface Props {
  experiences: Experience[];
  variant?: VARIANT;
}

export default function WorkExperienceSection({
  experiences,
  variant = "classic",
}: Props) {
  const { t } = useTranslation();
  if (!experiences.length) return null;

  switch (variant) {
    case "modern":
      return (
        <>
          <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
            {t("work_experience")}
          </h2>

          {experiences.length > 0 ? (
            <div className="relative border-l border-gray-300 pl-6 space-y-6">
              {experiences.map((work, index) => (
                <div key={work._id || index} className="relative">
                  <div className="absolute -left-8 top-0.5 w-4 h-4 bg-gray-300 rounded-full border-2 border-white" />

                  <p className="text-sm font-medium text-gray-600">
                    {work.startDate} {" - "}
                    {work.currentlyWorking ? t("present") : work.endDate}
                  </p>

                  <div className="mt-1.5">
                    <p className="font-semibold">
                      {t(`${work.position}`)}{" "}
                      <span className="text-gray-700">
                        at {work.company.name}
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      {work.company.location}
                    </p>
                    <p className="text-gray-800 mt-1">
                      {work.responsibilities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No work experiences added.</p>
          )}
        </>
      );

    default:
      return (
        <>
          <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
            {t("work_experience")}
          </h2>

          <ul className="space-y-2">
            {experiences.map((exp) => (
              <li key={exp._id} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <h4 className="text-sm text-gray-500 font-medium">
                    {exp.startDate} {" - "} {exp.endDate || "Present"}
                  </h4>

                  <span className="hidden sm:inline text-gray-400">|</span>

                  <h3 className="text-base font-semibold text-gray-900">
                    {t(`${exp.position}`)}{" "}
                    <span className="text-gray-600">at</span> {exp.company.name}
                  </h3>
                </div>

                <p className="mt-2 text-gray-700 leading-relaxed">
                  {exp.responsibilities}
                </p>
              </li>
            ))}
          </ul>
        </>
      );
  }
}
