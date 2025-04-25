import GridWrapper from "./GridWrapper";

const testimonials = [
  {
    text: "I had an amazing experience! The platform was intuitive, and I was able to build my resume in no time. Highly recommend to anyone looking to create a professional resume.",
    author: "Jon Doe",
  },
  {
    text: "This service saved me so much time! The templates are modern and clean, and it made my resume stand out. Will definitely use again for future job applications.",
    author: "Jane Smith",
  },
  {
    text: "A fantastic tool! The customization options allowed me to tailor my resume exactly the way I wanted it. Great value and super easy to use.",
    author: "Mark Johnson",
  },
];

const TestimonialCards = () => {
  return (
    <GridWrapper>
      {testimonials.map(({ text, author }, i) => (
        <article
          key={i}
          className="shadow rounded-xl hover:shadow-md transition-shadow duration-300 bg-white"
        >
          <div className="p-6 space-y-2">
            <p className="text-sm text-gray-700">{text}</p>
            <h3 className="font-semibold italic text-end text-rose-700">
              - {author}
            </h3>
          </div>
        </article>
      ))}
    </GridWrapper>
  );
};

export default TestimonialCards;
