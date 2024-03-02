import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  colSpan: string;
  name: string;
  options: {
    text: string;
    value: string;
  }[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export default function Select({
  label,
  colSpan,
  name,
  options,
  register,
  errors,
}: Props) {
  return (
    <div className={`${colSpan} flex flex-col gap-2`}>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <select
        {...register(name)}
        id={name}
        name={name}
        className={`bg-gray-200 p-3 rounded-lg font-semibold border outline-none focus:border-sky-600 ${
          errors[name] && "border-red-600"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errors[name] && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
}
