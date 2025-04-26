import { useParams } from "react-router-dom";
import TemplatePreviewCard from "../components/cards/TemplatePreviewCard";

const TemplateDetails = () => {
  const { slug } = useParams();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 capitalize">
        {slug?.split("-").join(" ")}
      </h2>

      {/* Template preview section */}
      <TemplatePreviewCard id={1} />

      {/* Template details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="text-gray-600">
            Showcase your creative work with elegance and style with a timeless
            CV template that fits traditional industries.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Features</h3>
          <ul className="list-disc list-inside text-gray-600 ms-3">
            <li>Lots of whitespace</li>
            <li>Simple typography</li>
            <li>Focus on achievements</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Actions</h3>
          <div className="flex gap-4 mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Use This Template
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
              Preview Full Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetails;
