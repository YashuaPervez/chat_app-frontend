"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import clsx from "clsx";

//
import { User } from "@/types/User";

type UserNavigationItemProps = {
  user: User;
};

const UserNavigationItem: React.FC<UserNavigationItemProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedUserId = searchParams.get("userId");

  const changeUser = (userId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("userId", userId.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className={clsx("", {
        underline: Number(selectedUserId) === user.id,
      })}
      onClick={() => {
        changeUser(user.id);
      }}
    >
      {user.firstName} {user.lastName}
    </button>
  );
};

export default UserNavigationItem;
