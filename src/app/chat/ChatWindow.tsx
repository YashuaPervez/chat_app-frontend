// Components
import Chat from "./Chat";

//
import { User } from "@/types/User"; //
import { getMessagesList } from "@/api";

type ChatWindowProps = {
  userId?: string;
  users: User[];
};

const ChatWindow: React.FC<ChatWindowProps> = async ({ userId, users }) => {
  const userIdNumber = Number(userId);
  const user = users.find((u) => u.id === userIdNumber);

  if (!user) {
    return <p>Please click on a users name</p>;
  }

  const messages = await getMessagesList(userIdNumber);

  return (
    <div className="flex flex-col">
      <Chat messages={messages} users={users} userId={userIdNumber} />
    </div>
  );
};

export default ChatWindow;
