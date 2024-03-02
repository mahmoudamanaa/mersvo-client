import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/form/Button";
import FileInput from "../ui/form/FileInput";
import Input from "../ui/form/Input";
import PasswordInput from "../ui/form/PasswordInput";
import Select from "../ui/form/Select";
import {
  editFormSchema,
  formInputs,
  formSchema,
  formSelects,
} from "../utils/data";
import { useForm } from "react-hook-form";
import { useAddUser } from "../hooks/mutations/useAddUser";
import { useEditUser } from "../hooks/mutations/useEditUser";
import LoadingSpinner from "../ui/LoadingSpinner";

type Props = {
  mode: string;
  closePopup: React.Dispatch<React.SetStateAction<string>>;
  defaultValues: any;
};

export default function Form({ mode, closePopup, defaultValues }: Props) {
  const { addUser, addingUser } = useAddUser();
  const { editUser, editingUser } = useEditUser(defaultValues?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(mode === "add" ? formSchema : editFormSchema),
    defaultValues: mode !== "add" ? defaultValues : undefined,
  });

  const onSubmitHandler = async (data: { [x: string]: any }) => {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("photo", data.photo);

    let response;
    if (mode === "add") {
      formData.append("password", data.password);

      response = await addUser(formData);
    } else {
      response = await editUser(formData);
    }

    if (response.status === "success") closePopup("");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-2 gap-3">
        {formInputs.map((input) => {
          if (mode !== "add" && input.type === "password") return null;

          if (input.type === "file")
            return (
              <FileInput
                setValue={setValue}
                errors={errors}
                register={register}
                key={input.name}
                label={input.label}
                colSpan={input.colSpan}
                name={input.name}
                previewUrl={
                  defaultValues?.photo ? defaultValues.photo : undefined
                }
              />
            );

          if (input.type === "password")
            return (
              <PasswordInput
                errors={errors}
                register={register}
                key={input.name}
                name={input.name}
                colSpan={input.colSpan}
                placeholder={input.placeholder}
                label={input.label}
              />
            );

          return (
            <Input
              errors={errors}
              register={register}
              key={input.name}
              name={input.name}
              colSpan={input.colSpan}
              placeholder={input.placeholder}
              type={input.type}
              label={input.label}
            />
          );
        })}
        {formSelects.map((select) => (
          <Select
            errors={errors}
            register={register}
            key={select.name}
            label={select.label}
            colSpan={select.colSpan}
            name={select.name}
            options={select.options}
          />
        ))}

        {addingUser || editingUser ? (
          <LoadingSpinner />
        ) : (
          <Button role="submit" styles="col-span-2">
            {mode === "add" ? "Add" : "Edit"} User
          </Button>
        )}
      </div>
    </form>
  );
}
