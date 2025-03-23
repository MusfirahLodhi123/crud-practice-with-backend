const InputField = ({
  id,
  label,
  type,
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className="border border-gray-300 p-2 rounded-lg outline-none"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={type}
          id={id}
          className="border border-gray-300 p-2 rounded-lg outline-none"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default InputField;
