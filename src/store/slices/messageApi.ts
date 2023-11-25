import { z } from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Message, messageSchema } from "@/types/Message";
import { createResponseSchema } from "@/types/Http";
import { generateUrl } from "@/utils/string";

const messagesResponseSchema = createResponseSchema(
  z.object({
    messages: z.array(messageSchema),
  })
);
const createMessageResponseSchema = createResponseSchema(
  z.object({
    message: messageSchema,
  })
);

const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: generateUrl("/protected/message"),
  }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], number>({
      query: (userId) => ({
        url: "",
        params: {
          withUserId: userId,
        },
        credentials: "include",
      }),
      transformResponse: (response: z.infer<typeof messagesResponseSchema>) => {
        const result = messagesResponseSchema.parse(response);
        return result.payload.messages;
      },
    }),
    createMessage: builder.mutation<
      Message,
      Pick<Message, "content" | "toUserId">
    >({
      query: ({ content, toUserId }) => ({
        url: "",
        method: "POST",
        body: {
          content,
          toUserId,
        },
        credentials: "include",
      }),
      transformResponse: (
        response: z.infer<typeof createMessageResponseSchema>
      ) => {
        const result = createMessageResponseSchema.parse(response);
        return result.payload.message;
      },
    }),
  }),
});

export default messageApi;
export const { useLazyGetMessagesQuery, useCreateMessageMutation } = messageApi;
