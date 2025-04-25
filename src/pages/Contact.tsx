import { Link } from "react-router-dom";
import ContactForm from "../features/ContactForm";

const Contact = () => {
  return (
    <section className="min-h-screen px-6 sm:px-12 py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <ContactForm />

        <div className="text-center text-sm text-gray-600 mt-12 space-y-3">
          <p>
            Prefer email? Reach us directly at{" "}
            <Link
              to="mailto:support@resumex.com"
              className="text-rose-600 underline hover:text-rose-800 transition"
            >
              support@resumex.com
            </Link>
          </p>

          <p>
            Got questions? Visit our{" "}
            <Link
              to="/how-it-works#faq"
              className="text-rose-600 underline hover:text-rose-800 transition"
            >
              Frequently Asked Questions
            </Link>{" "}
            before contacting us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
