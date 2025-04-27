const SectionHeader = ({
  title,
  mandatory = true,
}: {
  title: string;
  mandatory?: boolean;
}) => {
  return (
    <article>
      <h2 className="font-medium text-sm text-gray-600">{title}</h2>
      <p className="text-xs text-gray-600">
        {mandatory ? "Mandatory Step" : "Optional Step"}
      </p>
    </article>
  );
};

export default SectionHeader;
