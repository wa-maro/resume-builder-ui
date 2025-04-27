type SelectProps = {
  name: string;
  value: string;
  label: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>[];
};

const Select = ({
  name,
  value,
  label,
  style,
  onChange,
  children,
}: SelectProps) => {
  return (
    <select
      onChange={onChange}
      value={value}
      name={name}
      id={name}
      className={
        style
          ? style
          : "outline-none border border-gray-400 rounded px-2.5 py-1.5 text-sm placeholder:capitalizestyle"
      }
    >
      <option label={label} value=""></option>
      {children}
    </select>
  );
};

export default Select;
