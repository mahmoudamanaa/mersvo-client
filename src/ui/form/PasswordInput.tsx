import eyeIcon from "../../assets/eye-svgrepo-com.svg";
import eyeSlashIcon from "../../assets/eye-off-svgrepo-com.svg";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  colSpan: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export default function PasswordInput({
  label,
  colSpan,
  name,
  placeholder,
  register,
  errors,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${colSpan} flex flex-col gap-2`}>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          id={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className={`bg-gray-200 p-3 w-full rounded-lg font-semibold border outline-none focus:border-sky-600 ${
            errors[name] && "border-red-600"
          }`}
        />
        <div
          className="cursor-pointer absolute right-2 bottom-[0.85rem]"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img src={eyeSlashIcon} className="w-5" />
          ) : (
            <img src={eyeIcon} className="w-5" />
          )}
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-600">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
}
