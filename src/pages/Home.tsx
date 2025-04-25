import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TemplateCards from "../components/cards/TemplateCards";
import TestimonialCards from "../components/cards/TestimonialCards";
import StepCards from "../components/cards/StepCards";
import ctaImage from "../assets/cta-image.svg";

const Home = () => {
  return (
    <>
      <section className="sm:px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-12">
        <article className="space-y-6 text-center md:text-left md:basis-1/2">
          <div className="space-y-3 max-w-md md:max-w-lg">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Build Your Professional Resume in Minutes
            </h2>
            <p className="text-lg text-gray-500 leading-snug">
              Recruiters spend seconds on resumes — make yours count. Build a
              stunning, professional-grade resume in minutes and get noticed.
            </p>
          </div>

          <Link
            to="/resume"
            className="inline-flex items-center gap-2 bg-rose-700 text-white hover:bg-slate-800 transition-colors rounded-lg font-medium px-8 py-3"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </article>

        <article className="w-full max-w-sm lg:max-w-md">
          <img
            src={ctaImage}
            alt="Resume Builder Illustration"
            className="w-full h-auto object-contain"
          />
        </article>
      </section>

      <section className="px-6 sm:px-12 py-20 space-y-8 ">
        <header className="space-y-3 text-center max-w-md mx-auto">
          <h3 className="text-3xl text-center text-slate-700 font-medium">
            How it works
          </h3>
          <p className="text-lg text-gray-600">
            We’ve made it easy for anyone in Tanzania to build a job-winning
            resume — no design or tech skills required.
          </p>
        </header>

        <StepCards />

        <div className="text-center pt-10">
          <Link
            to="/resume"
            className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-xl font-medium transition"
          >
            Start Building Your Resume
          </Link>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-10 space-y-8 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-center text-slate-700 font-medium">
            Newest
          </h3>
          <button>
            <a
              href="/templates"
              className="underline hover:text-slate-700 hover:no-underline"
            >
              View All
            </a>
          </button>
        </div>

        <TemplateCards />
      </section>

      <section className="px-6 sm:px-12 py-10 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl text-center text-slate-700 font-medium">
            What They Say
          </h3>
        </div>

        <TestimonialCards />
      </section>
    </>
  );
};

export default Home;
