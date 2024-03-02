import profileIcon from "../../assets/profile-svgrepo-com.svg";
import plusIcon from "../../assets/plus-svgrepo-com.svg";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useState } from "react";

type Props = {
  label: string;
  colSpan: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  previewUrl?: string;
};

export default function FileInput({
  label,
  colSpan,
  name,
  register,
  errors,
  setValue,
  previewUrl,
}: Props) {
  const [filePreview, setFilePreview] = useState<string | undefined>(
    previewUrl
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValue(name, file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`${colSpan}`}>
      <label
        htmlFor={name}
        className="font-semibold cursor-pointer flex items-center gap-3"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
          {filePreview ? (
            <img
              src={filePreview}
              className="w-full h-full rounded-full"
              alt="Preview"
            />
          ) : (
            <img src={profileIcon} className="w-6" alt="Profile Icon" />
          )}
          <div className="absolute bg-sky-600 w-5 h-5 rounded-full flex items-center justify-center bottom-[-0.5rem] right-[-0.5rem]">
            <img src={plusIcon} className="w-4" alt="Plus Icon" />
          </div>
        </div>
        {label}
      </label>
      <input
        {...register("photo")}
        onChange={handleFileChange}
        id={name}
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
      />
      {errors[name] && (
        <p className="text-red-600">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
}
