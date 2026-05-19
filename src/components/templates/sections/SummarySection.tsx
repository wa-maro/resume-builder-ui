interface Props {
  summary: string;
  variant?: VARIANT;
}

const SummarySection = ({ summary, variant = "classic" }: Props) => {
  if (!summary) return null;

  switch (variant) {
    case "minimal":
      return <p className="italic pt-3">{summary}</p>;
    case "modern":
      return <div className="bg-gray-100 p-4 rounded">{summary}</div>;
    default:
      return (
        <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line text-justify">
          {summary}
        </p>
      );
  }
};

export default SummarySection;
