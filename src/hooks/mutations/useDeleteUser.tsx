import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser, isPending: deletingUser } = useMutation({
    mutationFn: async (data: { userId: string }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/users/${data.userId}`,
          {
            method: "DELETE",
          }
        );

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

  return { deleteUser, deletingUser };
};
