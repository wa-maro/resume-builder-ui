const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes! You can create and download your resume for free. No hidden charges or subscriptions required.",
  },
  {
    question: "Can I edit my resume later?",
    answer:
      "Absolutely. Just log in anytime to edit or update your resume. Your progress is automatically saved.",
  },
  {
    question: "Do I need any design skills?",
    answer:
      "Not at all. We've taken care of the layout and formatting, so you just need to fill in your details.",
  },
  {
    question: "Can I download my resume as PDF?",
    answer:
      "Yes, you can preview your resume and download a high-quality PDF version instantly.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We take data privacy seriously. Your resume data is securely stored and accessible only to you.",
  },
];

const FAQSection = () => (
  <section id="faq" className="mt-10 bg-white py-12 border-t border-gray-200">
    <div className="max-w-4xl mx-auto px-6 sm:px-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map(({ question, answer }, index) => (
          <details
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-sm"
          >
            <summary className="cursor-pointer font-medium text-gray-800">
              {question}
            </summary>
            <p className="text-gray-600 mt-3 text-sm">{answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
