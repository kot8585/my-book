import { UserFollowInfoType } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFollowInfoQuery = (userIdx: number) => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<UserFollowInfoType>(["users", "detail", userIdx, "follow"], () =>
    axios.get(`/api/users/${userIdx}`).then((res) => res.data)
  );

  return { user };
};
