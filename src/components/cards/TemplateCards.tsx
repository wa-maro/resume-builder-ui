import { Link } from "react-router-dom";
import GridWrapper from "./GridWrapper";

const templates = [
  {
    _id: "661d9cf31a9d2e8e019f1a01",
    name: "Modern Professional",
    slug: "modern-professional",
  },
  {
    _id: "661d9cf31a9d2e8e019f1a02",
    name: "Creative Edge",
    slug: "creative-edge",
  },
  {
    _id: "661d9cf31a9d2e8e019f1a03",
    name: "Classic Elegance",
    slug: "classic-elegance",
  },
  {
    _id: "661d9cf31a9d2e8e019f1a04",
    name: "Minimalist Focus",
    slug: "minimalist-focus",
  },
];

const TemplateCards = () => (
  <GridWrapper>
    {templates.map(({ name, slug }) => (
      <article className="shadow-md rounded-xl pb-6 hover:shadow-lg transition-shadow duration-200">
        <div className="space-y-4">
          <div className="w-full rounded-t-lg overflow-hidden flex items-center justify-center">
            <img
              src="https://placehold.co/320x320"
              alt={`${name} preview`}
              className="object-contain h-full"
            />
          </div>
          <div className="space-y-4 px-3">
            <h3 className="font-medium text-rose-700">{name}</h3>
            <button className="border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors rounded-lg font-medium px-4 py-2 w-full text-sm">
              <Link to={`templates/${slug}`}>Choose this template</Link>
            </button>
          </div>
        </div>
      </article>
    ))}
  </GridWrapper>
);

export default TemplateCards;
