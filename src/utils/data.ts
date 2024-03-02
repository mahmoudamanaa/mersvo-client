import * as yup from "yup";

export const tableColumns = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (props: { getValue: () => React.ReactNode }) => props.getValue(),
  },
];

export const formInputs = [
  {
    label: "Upload User Photo",
    type: "file",
    colSpan: "col-span-2",
    name: "photo",
    placeholder: "",
  },
  {
    label: "First name",
    type: "text",
    colSpan: "col-span-1",
    name: "first_name",
    placeholder: "Enter user first name",
  },
  {
    label: "Last name",
    type: "text",
    colSpan: "col-span-1",
    name: "last_name",
    placeholder: "Enter user last name",
  },
  {
    label: "Email",
    type: "email",
    colSpan: "col-span-2",
    name: "email",
    placeholder: "Enter user email",
  },
  {
    label: "Password",
    type: "password",
    colSpan: "col-span-2",
    name: "password",
    placeholder: "Enter user password",
  },
];

export const formSelects = [
  {
    label: "Role",
    colSpan: "col-span-2",
    name: "role",
    options: [
      { text: "Auther", value: "auther" },
      { text: "Editor", value: "editor" },
      { text: "Subscriber", value: "subscriber" },
    ],
  },
];

export const formSchema = yup.object().shape({
  photo: yup.mixed().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  role: yup.string().required(),
});

export const editFormSchema = yup.object().shape({
  photo: yup.mixed().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
});
