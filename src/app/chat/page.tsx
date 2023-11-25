import { cookies } from "next/headers";

// Components
import ChatWindow from "./ChatWindow";
import UserNavigation from "./UserNavigation";

//
import { getUsersList } from "@/api";
import SocketProvider from "@/providers/SocketProvider";

const Chat = async (request: any) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")!.value;

  const users = await getUsersList();

  const { userId } = request.searchParams;

  return (
    <SocketProvider token={token}>
      <div className="flex">
        <div className="w-full max-w-xs">
          <UserNavigation users={users} />
        </div>
        <div className="flex-1">
          <ChatWindow userId={userId} users={users} />
        </div>
      </div>
    </SocketProvider>
  );
};

export default Chat;
