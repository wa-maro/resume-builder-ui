type InputProps = {
  type?: string;
  name: string;
  value: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  type = "text",
  name,
  value,
  style,
  onChange,
}: InputProps) => {
  return (
    <input
      className={
        style
          ? style
          : "bg-gray-100 outline-none border rounded px-2.5 py-1.5 text-sm placeholder:capitalizestyle"
      }
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
