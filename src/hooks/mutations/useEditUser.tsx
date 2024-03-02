import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditUser = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: editUser, isPending: editingUser } = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/users/${userId}`, {
          method: "PATCH",
          body: data,
        });

        const resData = await res.json();

        if (!res.ok) toast.error(resData.message);

        return resData;
      } catch (err) {
        toast.error("Something went wrong, please try again later!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { editUser, editingUser };
};
