import { useTranslation } from "react-i18next";

interface Props {
  referees: Referee[];
  variant?: VARIANT;
}

export default function RefereeSection({
  referees,
  variant = "classic",
}: Props) {
  const { t } = useTranslation();
  if (!referees.length) return null;

  if (variant === "modern") {
    return (
      <section className="my-6">
        <h2 className="text-xl font-semibold pb-2 mb-3">{t("referees")}</h2>

        {referees.length > 0 ? (
          <div className="grid md:grid-cols-2 print:grid-cols-1 gap-4">
            {referees.map((referee) => (
              <div
                key={referee._id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white print:border-none print:shadow-none print:p-0"
              >
                {/* Full Name */}
                <p className="font-semibold text-lg mb-1">{referee.fullName}</p>

                {/* Position */}
                <p className="text-gray-700 text-sm mb-0.5">
                  {referee.position}
                </p>

                {/* Organization */}
                <p className="text-gray-700 text-sm mb-0.5">
                  {referee.organization}
                </p>

                {/* Address */}
                <p className="text-gray-600 text-sm mb-2">
                  {referee.physicalAddress}
                </p>

                {/* Email */}
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${referee.email}`}
                    className="text-blue-600 hover:underline print:text-black"
                  >
                    {referee.email}
                  </a>
                </p>

                {/* Phone */}
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href={`tel:${referee.phone}`}
                    className="text-blue-600 hover:underline print:text-black"
                  >
                    {referee.phone}
                  </a>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No referees added.</p>
        )}
      </section>
    );
  }

  return (
    <section className="my-6">
      <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
        {t("referees")}
      </h2>

      {referees.length > 0 ? (
        <ul className="space-y-4">
          {referees.map((referee) => (
            <li key={referee._id}>
              {/* Full Name */}
              <p className="font-semibold">{referee.fullName}</p>

              {/* Position & Organization */}
              <p className="text-gray-700 text-sm">
                {referee.position}, {referee.organization}
              </p>

              {/* Address */}
              <p className="text-gray-600 text-sm">{referee.physicalAddress}</p>

              {/* Email & Phone */}
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                <a
                  href={`mailto:${referee.email}`}
                  className="text-blue-600 hover:underline print:text-black"
                >
                  {referee.email}
                </a>
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${referee.phone}`}
                  className="text-blue-600 hover:underline print:text-black"
                >
                  {referee.phone}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No referees added.</p>
      )}
    </section>
  );
}
