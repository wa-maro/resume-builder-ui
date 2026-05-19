import { useTranslation } from "react-i18next";

interface Props {
  schools: School[];
  academics?: Academic[];
  variant?: VARIANT;
}

const EducationSection = ({
  schools,
  academics = [],
  variant = "classic",
}: Props) => {
  const { t } = useTranslation();
  if (!schools.length && !academics.length) return null;

  if (variant === "minimal")
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
          {t("education")}
        </h2>

        <div className="space-y-6">
          {schools.map((school: School, index: number) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>
                  {school.startYear} – {school.endYear}
                </span>
                <span>{school.school.location}</span>
              </div>
              <div className="mt-1">
                <p className="font-semibold">{school.award}</p>
                <p className="text-gray-700">{school.school.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  if (variant === "modern")
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
          {t("education")}
        </h2>

        <div className="space-y-6">
          {schools.map((school: School, index: number) => (
            <div
              key={index}
              className="p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                <span>
                  {school.startYear} – {school.endYear}
                </span>
                <span>{school.school.location}</span>
              </div>
              <p className="font-semibold text-gray-800">{school.award}</p>
              <p className="text-gray-600 text-sm">{school.school.name}</p>
            </div>
          ))}

          {academics.map((academic: Academic, index: number) => (
            <div
              key={index}
              className="p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                <span>
                  {academic.startYear} – {academic.endYear}
                </span>
                <span>{academic.institution.location}</span>
              </div>
              <p className="font-semibold text-gray-800">{academic.award}</p>
              <p className="text-gray-600 text-sm">
                {academic.institution.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
        {t("education")}
      </h2>

      <div className="space-y-6">
        {schools.map((school: School, index: number) => (
          <div key={index} className="grid grid-cols-4 gap-2 text-sm">
            <div className="col-span-1 font-medium">
              {school.startYear} – {school.endYear}
            </div>
            <div className="col-span-3 border-b border-b-gray-300 pb-3">
              <p className="font-semibold">{school.award}</p>
              <p className="text-gray-700">
                {school.school.name}, {school.school.location}
              </p>
            </div>
          </div>
        ))}
        {academics.map((academic: Academic, index: number) => (
          <div key={index} className="grid grid-cols-4 gap-2 text-sm">
            <div className="col-span-1 font-medium">
              {academic.startYear} – {academic.endYear}
            </div>
            <div className="col-span-3 border-b border-b-gray-300 pb-3">
              <p className="font-semibold">{academic.award}</p>
              <p className="text-gray-700">
                {academic.institution.name}, {academic.institution.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
