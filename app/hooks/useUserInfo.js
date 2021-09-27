import { useState } from "react";
import { getUser } from "../API/auth";

const useUserInfo = (user) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    setLoading(true);
    const result = await getUser(user.uid);
    setLoading(false);

    if (result) setUserInfo(result);
  };

  return { userInfo, loading, getUserInfo };
};

export default useUserInfo;
