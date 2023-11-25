"use client";

import { useRef, useEffect, useState } from "react";

// Components
import SendMessageForm, { OnMessageCreate } from "./SendMessageForm";
import Alert from "../components/Alert";

//
import { User } from "@/types/User";
import { Message, messageSchema } from "@/types/Message";
import {
  useCreateMessageMutation,
  useLazyGetMessagesQuery,
} from "@/store/slices/messageApi";
import { useSocket } from "@/providers/SocketProvider";

type ChatProps = {
  messages: Message[];
  users: User[];
  userId: number;
};
const Chat: React.FC<ChatProps> = ({ messages: _messages, users, userId }) => {
  const socket = useSocket();

  const [messages, setMessages] = useState(_messages);
  const [socketlistenerAttached, setSocketListenerAttached] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [messagesQuery, { error: getMessageError, isLoading }] =
    useLazyGetMessagesQuery();
  const [_, { error }] = useCreateMessageMutation({
    fixedCacheKey: "send-message-form",
  });

  const messageCreateHandler: OnMessageCreate = (message) => {
    setMessages((prev) => [...prev, message]);

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    messagesQuery(userId).then((response) => {
      if (response.isSuccess) {
        setMessages(response.data);
      }
    });
  }, [userId]);

  useEffect(() => {
    if (!socketlistenerAttached && socket) {
      socket.on("messages:create", (_message) => {
        const message = messageSchema.parse(_message);
        messageCreateHandler(message);
      });

      setSocketListenerAttached(true);
    }
  }, [socket, socketlistenerAttached]);

  return (
    <>
      <div
        ref={messagesContainerRef}
        className="w-full h-60 overflow-y-scroll mb-3"
      >
        <Alert error={getMessageError} />
        <Alert error={error} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {messages.map((message) => {
              const sender = users.find((u) => u.id === message.fromUserId);
              return (
                <li key={message.id} className="mb-2 last:mb-0">
                  <h4 className="inline mr-2 text-lg font-medium">
                    {sender ? (
                      <>
                        {sender.firstName} {sender.lastName}
                      </>
                    ) : (
                      <>You</>
                    )}
                    :
                  </h4>
                  <p className="inline">{message.content}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <SendMessageForm
        toUserId={userId}
        onMessageCreate={messageCreateHandler}
      />
    </>
  );
};

export default Chat;
