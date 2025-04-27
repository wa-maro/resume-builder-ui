import { Outlet, useParams } from "react-router-dom";
import TemplatePreviewCard from "../components/cards/TemplatePreviewCard";

const Templates = () => {
  const { slug } = useParams();

  const isViewingSingleTemplate = !!slug;

  return (
    <div className="p-6 bg-white">
      {!isViewingSingleTemplate && (
        <>
          <h1 className="text-3xl font-bold mb-4">Templates</h1>

          <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <TemplatePreviewCard key={index} id={index + 1} />
            ))}
          </ul>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default Templates;
