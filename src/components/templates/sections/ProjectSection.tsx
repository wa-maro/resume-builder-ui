import { useTranslation } from "react-i18next";

interface Props {
  projects: Project[];
  variant?: VARIANT;
}

export default function ProjectSection({ projects, variant = "list" }: Props) {
  const { t } = useTranslation();
  if (!projects.length) return null;

  if (variant === "minimal")
    return (
      <section className="my-6">
        <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
          {t("projects")}
        </h2>

        <ul className="space-y-6">
          {projects.map((p) => (
            <li key={p._id}>
              <h3 className="font-medium text-gray-900">{p.title}</h3>
              <p className="text-gray-700 text-sm">{p.description}</p>
              {p.tools && p.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    );

  if (variant === "modern") {
    return (
      <section className="my-6">
        <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
          {t("projects")}
        </h2>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border border-gray-200 rounded-xl shadow-sm print:border-0 print:rounded-none print:shadow-none hover:shadow-md transition p-4 bg-white"
              >
                <div>
                  {project.image ? (
                    <img
                      src={`http://localhost:8080/uploads/${project.image.toString()}`}
                      alt={project.title}
                      className="w-full max-h-48 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </div>

                <h3 className="text-lg font-semibold my-2">{project.title}</h3>

                <p className="text-gray-700 text-sm mb-3">
                  {project.description.slice(0, 160)}...
                </p>

                {project.tools && project.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {project.socialLinks && project.socialLinks.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {project.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {link.includes("github")
                          ? "GitHub"
                          : link.includes("linkedin")
                            ? "LinkedIn"
                            : link.includes("facebook")
                              ? "Facebook"
                              : link.includes("instagram")
                                ? "Instagram"
                                : link.includes("youtube")
                                  ? "YouTube"
                                  : link.includes("http")
                                    ? "Live Demo"
                                    : "Link"}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No projects added.</p>
        )}
      </section>
    );
  }

  return (
    <section className="my-6">
      <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
        {t("projects")}
      </h2>

      <ul className="space-y-6">
        {projects.map((p) => (
          <li key={p._id} className="flex gap-4 items-start">
            {/* Image */}
            <div className="w-48 h-32">
              {p.image ? (
                <img
                  src={`http://localhost:8080/uploads/${p.image.toString()}`}
                  alt={p.title}
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
              <h3 className="font-medium text-gray-900">{p.title}</h3>
              <p className="text-gray-700 text-sm mt-1">{p.description}</p>

              {p.tools && p.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
