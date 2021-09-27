import { useState } from "react";
import { getUsers } from "../API/auth";

const useUserInfo = (user) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    setLoading(true);
    const result = await getUsers(user.uid);
    setLoading(false);

    if (result) setUserInfo(result);
  };

  return { userInfo, loading, getUserInfo };
};

export default useUserInfo


