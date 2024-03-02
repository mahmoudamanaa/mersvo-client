import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  type: string;
  colSpan: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export default function Input({
  label,
  type,
  colSpan,
  name,
  placeholder,
  register,
  errors,
}: Props) {
  return (
    <div className={`${colSpan} flex flex-col gap-2`}>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`bg-gray-200 p-3 rounded-lg font-semibold border outline-none focus:border-sky-600 ${
          errors[name] && "border-red-600"
        }`}
      />
      {errors[name] && <p className="text-red-600">This field is required</p>}
    </div>
  );
}
