import { useTranslation } from "react-i18next";

interface Props {
  skills: Skill[];
  variant?: VARIANT;
}

export default function SkillSection({ skills, variant = "list" }: Props) {
  const { t } = useTranslation();
  if (!skills.length) return null;

  if (variant === "modern") {
    return (
      <section className="my-6">
        <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
          {t("skills")}
        </h2>

        {skills.length > 0 ? (
          <div className="space-y-6">
            {skills.some((s) => s.category === "personal") && (
              <div>
                <h3 className="font-semibold mb-2">{t("personal_skills")}</h3>
                <div className="grid md:grid-cols-2 print:grid-cols-1 gap-3">
                  {skills
                    .filter((s) => s.category === "personal")
                    .map((skill) => (
                      <div
                        key={skill._id}
                        className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white print:border-none print:shadow-none print:p-0"
                      >
                        <p className="font-medium">{skill.name}</p>

                        <div className="flex items-center gap-1 mt-2 print:hidden">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <span
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i < Math.round(skill.proficiency / 10)
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}
                            ></span>
                          ))}
                        </div>

                        <p className="hidden print:block text-sm text-gray-700">
                          {t("proficiency")}: {skill.proficiency / 5}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {skills.some((s) => s.category === "professional") && (
              <div>
                <h3 className="font-semibold mb-2">
                  {t("professional_skills")}
                </h3>
                <div className="grid md:grid-cols-2 print:grid-cols-1 gap-3">
                  {skills
                    .filter((s) => s.category === "professional")
                    .map((skill) => (
                      <div
                        key={skill._id}
                        className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white print:border-none print:shadow-none print:p-0"
                      >
                        <p className="font-medium">{skill.name}</p>

                        <div className="flex items-center gap-1 mt-2 print:hidden">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <span
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i < Math.round(skill.proficiency / 10)
                                  ? "bg-green-600"
                                  : "bg-gray-300"
                              }`}
                            ></span>
                          ))}
                        </div>

                        <p className="hidden print:block text-sm text-gray-700">
                          {t("proficiency")}: {skill.proficiency / 5}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No skills added.</p>
        )}
      </section>
    );
  }

  return (
    <section className="my-6">
      <h2 className="text-xl font-semibold pb-2 mb-3">{t("skills")}</h2>

      {skills.length > 0 ? (
        <div className="space-y-8 grid grid-cols-2">
          {skills.some((s) => s.category === "personal") && (
            <div className="border-l border-gray-300 ps-4">
              <h3 className="text-lg font-semibold text-gray-600 pb-1 mb-1">
                {t("personal_skills")}
              </h3>
              <ul className="list-disc list-inside space-y-2 ms-5">
                {skills
                  .filter((s) => s.category === "personal")
                  .map((skill) => (
                    <li key={skill._id} className="text-base text-gray-800">
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {skills.some((s) => s.category === "professional") && (
            <div className="border-l border-gray-300 ps-4">
              <h3 className="text-lg font-semibold text-gray-600 pb-1 mb-1">
                {t("professional_skills")}
              </h3>
              <ul className="list-disc list-inside space-y-2 ms-5">
                {skills
                  .filter((s) => s.category === "professional")
                  .map((skill) => (
                    <li key={skill._id} className="text-base text-gray-800">
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No skills added.</p>
      )}
    </section>
  );
}
