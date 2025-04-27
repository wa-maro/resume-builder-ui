const TextArea = ({
  name,
  required = false,
  value,
  onChange,
}: {
  name: string;
  required?: boolean;
  value: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      name={name}
      value={value}
      rows={5}
      required={required}
      onChange={onChange}
      className="w-full outline-none border border-gray-400 rounded px-2.5 py-2 "
    />
  );
};

export default TextArea;
