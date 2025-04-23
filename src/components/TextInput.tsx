type InputProps = {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ type = "text", name, value, onChange }: InputProps) => {
  return (
    <input
      className="bg-gray-100 outline-none border rounded px-2.5 py-1.5 text-sm placeholder:capitalize"
      autoComplete="true"
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
