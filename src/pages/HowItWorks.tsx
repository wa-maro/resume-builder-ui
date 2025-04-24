import { Link } from "react-router-dom";
import StepCards from "../components/cards/StepCards";
import FAQSection from "../features/FAQSection";

const HowItWorks = () => (
  <>
    <section className="px-6 sm:px-12 py-12 space-y-12 max-w-7xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          How Our Resume Builder Works
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’ve made it easy for anyone in Tanzania to build a job-winning
          resume — no design or tech skills required.
        </p>
      </header>

      <StepCards />

      <div className="text-center pt-10">
        <Link
          to="/resume"
          className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-medium transition"
        >
          Start Building Your Resume
        </Link>
      </div>
    </section>

    <FAQSection />
  </>
);

export default HowItWorks;
