import { useTranslation } from "react-i18next";

interface Props {
  personalInfo?: ResumePreview["sections"]["personalInfo"];
  variant?: VARIANT;
}

const PersonalInfoSection = ({ personalInfo, variant = "classic" }: Props) => {
  const { t } = useTranslation();

  if (!personalInfo) return null;

  switch (variant) {
    case "minimal":
      return (
        <section className="my-6">
          <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
            {t("personal_info")}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Email:</strong> {personalInfo?.email || "-"}
            </p>
            <p>
              <strong>Phone:</strong> {personalInfo?.phone || "-"}
            </p>

            <p>
              <strong>Nationality:</strong> {personalInfo?.nationality || "-"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {personalInfo?.dateOfBirth || "-"}
            </p>
            <p>
              <strong>Gender:</strong> {personalInfo?.gender || "-"}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {personalInfo?.maritualStatus || "-"}
            </p>
            <p>
              <strong>Place of Domicile:</strong>{" "}
              {personalInfo?.placeOfDomicile || "-"}
            </p>
            <p>
              <strong>Disabilities:</strong>{" "}
              {personalInfo?.disabilities?.length
                ? personalInfo.disabilities.join(", ")
                : "None"}
            </p>
          </div>
        </section>
      );

    case "modern":
      return (
        <section className="my-6">
          <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
            {t("personal_info")}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Nationality:</strong> {personalInfo?.nationality || "-"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {personalInfo?.dateOfBirth || "-"}
            </p>
            <p>
              <strong>Gender:</strong> {personalInfo?.gender || "-"}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {personalInfo?.maritualStatus || "-"}
            </p>
            <p>
              <strong>Place of Domicile:</strong>{" "}
              {personalInfo?.placeOfDomicile || "-"}
            </p>
            <p>
              <strong>Disabilities:</strong>{" "}
              {personalInfo?.disabilities?.length
                ? personalInfo.disabilities.join(", ")
                : "None"}
            </p>
          </div>
        </section>
      );

    default:
      return (
        <section className="my-6">
          <h2 className="text-xl font-semibold border-b border-b-gray-300 pb-2 mb-4">
            {t("personal_info")}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <strong>{t("full_name")}:</strong> {personalInfo?.fullName}
            </p>
            <p>
              <strong>Email:</strong> {personalInfo?.email || "-"}
            </p>
            <p>
              <strong>Phone:</strong> {personalInfo?.phone || "-"}
            </p>
            <p>
              <strong>Address:</strong> {personalInfo?.physicalAddress || "-"}
            </p>
            <p>
              <strong>Nationality:</strong> {personalInfo?.nationality || "-"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {personalInfo?.dateOfBirth || "-"}
            </p>
            <p>
              <strong>Gender:</strong> {personalInfo?.gender || "-"}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {personalInfo?.maritualStatus || "-"}
            </p>
            <p>
              <strong>Place of Domicile:</strong>{" "}
              {personalInfo?.placeOfDomicile || "-"}
            </p>
            <p>
              <strong>Disabilities:</strong>{" "}
              {personalInfo?.disabilities?.length
                ? personalInfo.disabilities.join(", ")
                : "None"}
            </p>
          </div>
        </section>
      );
  }
};

export default PersonalInfoSection;
