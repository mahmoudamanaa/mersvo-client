import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetUsers = (page: number, limit: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/users?page=${page}&limit=${limit}`
        );

        const resData = await res.json();

        if (!res.ok) toast.error(resData.message);

        return resData;
      } catch (err) {
        toast.error("Something went wrong, please try again later!");
      }
    },
    placeholderData: keepPreviousData,
  });

  let users;
  let totalPages;

  if (data) {
    users = data?.data?.users;
    totalPages = data?.metadata?.totalPages;
  }

  return { users, isLoading, totalPages };
};
