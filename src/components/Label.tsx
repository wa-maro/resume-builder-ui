type LabelTYpe = {
  htmlFor: string;
  text: string;
};
const Label = ({ htmlFor, text }: LabelTYpe) => {
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-600 capitalize">
      {text}
    </label>
  );
};

export default Label;
