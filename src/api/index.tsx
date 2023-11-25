//
import requestServer from "@/lib/requestServer";
import { User } from "@/types/User";
import { Message } from "@/types/Message";

export const getMe = async (): Promise<User> => {
  const response = await requestServer("/protected/user/me", {
    cache: "no-cache",
    addAuth: true,
  });
  const data = await response.json();
  return data.payload.user;
};

export const getUsersList = async (): Promise<User[]> => {
  const response = await requestServer("/protected/user/", {
    cache: "no-cache",
    addAuth: true,
  });
  const data = await response.json();
  return data.payload.users;
};

export const getMessagesList = async (
  withUserId: number
): Promise<Message[]> => {
  const response = await requestServer(
    `/protected/message?withUserId=${withUserId}`,
    {
      cache: "no-cache",
      addAuth: true,
    }
  );
  const data = await response.json();
  return data.payload.messages;
};
