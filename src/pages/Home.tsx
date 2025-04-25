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
            className="inline-flex items-center gap-2 bg-teal-700 text-white hover:bg-teal-800 transition-colors rounded-lg font-medium px-8 py-3"
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

      <section className="px-6 sm:px-12 py-10 space-y-8">
        <div>
          <h2 className="text-2xl text-center font-medium">How it works</h2>
          <p className="text-lg text-center">
            Create your professional resume in just a few easy steps — no design
            skills needed.
          </p>
        </div>

        <StepCards />
      </section>

      <section className="px-6 sm:px-12 py-10 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-center font-medium">Newest</h2>
          <button>
            <a
              href="/templates"
              className="underline hover:text-teal-700 hover:no-underline"
            >
              View All
            </a>
          </button>
        </div>

        <TemplateCards />
      </section>

      <section className="px-6 sm:px-12 py-10 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-center font-medium">What They Say</h2>
        </div>

        <TestimonialCards />
      </section>
    </>
  );
};

export default Home;
