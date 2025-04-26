import { Link, useParams } from "react-router-dom";

const TemplatePreviewCard = ({ id }: { id: number }) => {
  const { slug } = useParams();

  return (
    <li className="border border-gray-100 rounded-lg p-4 shadow-lg mb-6 bg-white space-y-4 list-none">
      <div className="h-64 bg-gray-50 flex items-center justify-center cursor-progress">
        <span className="text-gray-400">Template Preview Here</span>
      </div>

      {!slug && (
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <h4 className="text-lg text-rose-700 capitalize">Template {id}</h4>

          <Link
            to={`/templates/template-${id}`}
            className="bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-700 transition-colors duration-200"
          >
            Choose this template
          </Link>
        </div>
      )}
    </li>
  );
};

export default TemplatePreviewCard;
