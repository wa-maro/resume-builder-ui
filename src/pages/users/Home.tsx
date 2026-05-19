import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StepCards from "../../components/cards/StepCards";
import ctaImage from "../../assets/cta-image.svg";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="sm:px-6 lg:px-20 pt-10 pb-20 flex flex-col-reverse md:flex-row items-center gap-12">
        <article className="space-y-6 text-center md:text-left md:basis-1/2">
          <div className="space-y-3 max-w-md md:max-w-lg">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {t("cta_title")}
            </h2>
            <p className="text-lg text-gray-500 leading-snug">
              {t("cta_description")}
            </p>
          </div>

          <Link
            to="/resume"
            className="inline-flex items-center gap-2 bg-amber-800 text-white hover:bg-slate-800 transition-colors rounded-lg font-medium px-8 py-3"
          >
            {t("cta_button")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </article>

        <article className="w-full max-w-sm lg:max-w-md">
          <img
            src={ctaImage}
            alt={t("cta_image_alt")}
            className="w-full h-auto object-contain"
          />
        </article>
      </section>

      <section className="px-6 sm:px-12 py-20 space-y-8 bg-white">
        <header className="space-y-3">
          <h3 className="text-3xl text-center text-slate-700 font-medium">
            {t("how_it_works_title")}
          </h3>
          <p className="text-lg text-gray-600">
            {t("how_it_works_description")}
          </p>
        </header>

        <StepCards />

        <div className="text-center pt-10">
          <Link
            to="/resume"
            className="bg-amber-700 hover:bg-amber-800 text-white py-3 px-6 rounded-xl font-medium transition"
          >
            {t("start_building_resume")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
