import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TemplateCards from "../components/cards/TemplateCards";
import TestimonialCards from "../components/cards/TestimonialCards";
import StepCards from "../components/cards/StepCards";

const Home = () => {
  return (
    <>
      <section className="px-6 sm:px-12 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <article className="space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 max-w-md">
              Build Your Professional Resume in Minutes
            </h2>
            <p className="text-lg max-w-md text-gray-500 leading-snug">
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

        <article>
          <img
            src="https://placehold.co/600x400"
            alt="Resume illustration"
            className="w-full max-w-lg rounded-xl shadow-md"
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
