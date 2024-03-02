import Table from "../features/Table";
import Button from "../ui/form/Button";
import { tableColumns } from "../utils/data";
import { useGetUsers } from "../hooks/queries/useGetUsers";
import { useEffect, useState } from "react";
import Form from "../features/Form";
import { User } from "../utils/types";
import moment from "moment";
import deleteIcon from "../assets/delete-svgrepo-com.svg";
import editIcon from "../assets/edit-pencil-01-svgrepo-com.svg";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser";
import { useSearchParams } from "react-router-dom";
import Popup from "../ui/Popup";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function Home() {
  const [page, setPage] = useState(1);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ page: page as any });
  }, [page]);

  const [openAddEdit, setOpenAddEdit] = useState("");
  const [openDelete, setOpenDelete] = useState("");

  const { users, isLoading, totalPages } = useGetUsers(page, 10);
  const { deleteUser, deletingUser } = useDeleteUser();

  const mappedUsers = users?.map((user: User) => ({
    id: user._id,
    photo: (
      <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
        <img src={user.photo} />
      </div>
    ),
    full_name: user.first_name + " " + user.last_name,
    email: <p className="underline">{user.email}</p>,
    updatedAt: moment(user.updatedAt).format("dddd, MMMM Do YYYY"),
    role: <p className="capitalize">{user.role}</p>,
    actions: (
      <div className="flex items-center gap-3">
        <img
          src={editIcon}
          className="w-5 cursor-pointer"
          onClick={() => setOpenAddEdit(user._id)}
        />
        <img
          src={deleteIcon}
          className="w-5 cursor-pointer"
          onClick={() => setOpenDelete(user._id)}
        />
      </div>
    ),
  }));

  const handleDeleteUser = async () => {
    const response = await deleteUser({ userId: openDelete });

    if (response.status === "success") setOpenDelete("");
  };

  return (
    <>
      <Popup
        show={openAddEdit}
        closePopup={setOpenAddEdit}
        title={`${openAddEdit === "add" ? "Add" : "Edit"} user`}
        subTitle={`${
          openAddEdit === "add" ? "Add a new user" : "Edit existing user"
        }`}
      >
        <Form
          mode={openAddEdit}
          closePopup={setOpenAddEdit}
          defaultValues={users?.find((user: User) => openAddEdit === user._id)}
        />
      </Popup>
      <Popup show={openDelete} closePopup={setOpenDelete} title="Delete user">
        <div className="space-y-3">
          <p className="text-lg font-semibold">
            Are you sure you want to delete this user?
          </p>
          {deletingUser ? (
            <LoadingSpinner />
          ) : (
            <Button styles="w-full" onClick={handleDeleteUser}>
              Delete
            </Button>
          )}
        </div>
      </Popup>
      <article className="p-5 space-y-5">
        <div className="flex justify-end">
          <Button onClick={() => setOpenAddEdit("add")}>Add User</Button>
        </div>
        <Table
          data={mappedUsers || []}
          columns={tableColumns}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </article>
    </>
  );
}
