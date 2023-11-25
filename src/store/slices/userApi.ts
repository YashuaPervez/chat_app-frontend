import { z } from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//
import { userSchema, User } from "@/types/User";
import { createResponseSchema } from "@/types/Http";
import { generateUrl } from "@/utils/string";

const signupResponseSchema = createResponseSchema(
  z.object({
    user: userSchema,
  })
);
const loginResponseSchema = signupResponseSchema;
const meResponseSchema = signupResponseSchema;
const usersResponseSchema = createResponseSchema(
  z.object({
    users: z.array(userSchema),
  })
);

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: generateUrl(""),
  }),

  endpoints: (builder) => ({
    signup: builder.mutation<
      User,
      Pick<User, "firstName" | "lastName" | "email"> & { password: string }
    >({
      query: ({ firstName, lastName, email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          firstName,
          lastName,
          email,
          password,
        },
        credentials: "include",
      }),
      transformResponse: (response: z.infer<typeof signupResponseSchema>) => {
        const result = signupResponseSchema.parse(response);
        return result.payload.user;
      },
    }),
    login: builder.mutation<User, Pick<User, "email"> & { password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include",
      }),
      transformResponse: (response: z.infer<typeof loginResponseSchema>) => {
        const result = loginResponseSchema.parse(response);
        return result.payload.user;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/protected/user/me",
        credentials: "include",
      }),
      transformResponse: (response: z.infer<typeof meResponseSchema>) => {
        const result = meResponseSchema.parse(response);

        return result.payload.user;
      },
    }),
    users: builder.query<User[], void>({
      query: () => ({
        url: "/protected/user/",
        credentials: "include",
      }),
      transformResponse: (response: z.infer<typeof usersResponseSchema>) => {
        const result = usersResponseSchema.parse(response);
        return result.payload.users;
      },
    }),
  }),
});

export default userApi;
export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUsersQuery,
  useMeQuery,
} = userApi;
