import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const FAQSection = () => {
  const { t } = useTranslation();
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`);
      const result = await res.json();
      setFAQs(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section id="faq" className="mt-10 bg-white py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {t("frequently_asked_questions")}
        </h2>

        <div className="space-y-4">
          {faqs.map(({ question, answer }, index) => (
            <details
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-sm"
            >
              <summary className="cursor-pointer font-medium text-gray-800">
                {t(question)}
              </summary>
              <p className="text-gray-600 mt-3 text-sm">{t(answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
