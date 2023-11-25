import { z } from "zod";

export const createResponseSchema = <PayloadType extends z.AnyZodObject>(
  payloadSchema: PayloadType
) => {
  const responseSchema = z.object({
    message: z.string(),
    success: z.boolean(),
    payload: payloadSchema,
  });

  return responseSchema;
};

export const errorResponseSchema = createResponseSchema(z.object({}));

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
