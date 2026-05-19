import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContactForm from "../features/ContactForm";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen px-6 sm:px-12 py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            {t("contact_us")}
          </h1>
          <p className="text-gray-600 mt-2">{t("contact_description")}</p>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-600 mt-12 space-y-3">
          <p>
            {t("prefer_email")}{" "}
            <Link
              to="mailto:support@resumex.com"
              className="text-amber-700 underline hover:text-amber-800 transition"
            >
              support@resumex.com
            </Link>
          </p>

          <p>
            {t("got_questions")}{" "}
            <Link
              to="/how-it-works#faq"
              className="text-amber-700 underline hover:text-amber-800 transition"
            >
              {t("faq")}
            </Link>{" "}
            {t("before_contacting")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
