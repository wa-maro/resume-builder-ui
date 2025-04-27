type InputProps = {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  type = "text",
  name,
  placeholder = "",
  value,
  style,
  onChange,
}: InputProps) => {
  return (
    <input
      className={
        style
          ? style
          : "outline-none border border-gray-400 rounded px-2.5 py-2 text-sm placeholder:capitalizestyle"
      }
      autoComplete="true"
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
