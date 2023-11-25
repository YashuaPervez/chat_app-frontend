"use client";

import { useRouter } from "next/navigation";

// Components
import Button from "../components/Button";

//
import { useLogoutMutation } from "@/store/slices/userApi";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();

    router.push("/");
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutButton;
