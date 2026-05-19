import { useTranslation } from "react-i18next";

interface Props {
  declaration: Declaration;
  variant?: VARIANT;
}

export default function DeclarationSection({
  declaration,
  variant = "classic",
}: Props) {
  const { t } = useTranslation();
  if (!declaration) return null;

  if (variant === "modern") {
    return (
      <section className="mt-12">
        <p className="text-gray-800 mb-6">{declaration.statement}</p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
          <div className="flex flex-col">
            <span className="text-gray-700 mb-1">{t("signature")}:</span>
            {declaration.signature ? (
              <p className="font-semibold italic">{declaration.signature}</p>
            ) : (
              <span className="inline-block border-b border-dotted border-gray-700 w-48 h-6"></span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-700 mb-1">{t("date")}:</span>
            <p className="font-semibold">{declaration.date}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <p className="text-gray-800 mb-6">{declaration.statement}</p>

      <div className="flex flex-col">
        {declaration.signature ? (
          <p className="font-semibold italic">{declaration.signature}</p>
        ) : (
          <span className="inline-block border-b border-dotted border-gray-700 w-48 h-6"></span>
        )}
        <p>{declaration.date}</p>
      </div>
    </section>
  );
}
