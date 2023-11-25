"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import Input from "@/app/components/formElements/Input";
import Button from "@/app/components/Button";

//
import { useCreateMessageMutation } from "@/store/slices/messageApi";
import { Message } from "@/types/Message";

export type OnMessageCreate = (message: Message) => void;

type SendMessageFormProps = {
  toUserId: number;
  onMessageCreate?: OnMessageCreate;
};

type FormValues = {
  content: string;
};

const formSchema = object({
  content: string().required(),
});

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  toUserId,
  onMessageCreate,
}) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });
  const [createMessage, { isLoading }] = useCreateMessageMutation({
    fixedCacheKey: "send-message-form",
  });

  const formSubmitHandler: SubmitHandler<FormValues> = async ({ content }) => {
    const response = await createMessage({
      content,
      toUserId,
    });

    form.reset();
    form.setFocus("content");

    if ("data" in response) {
      onMessageCreate?.(response.data);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(formSubmitHandler)}>
      <FormProvider {...form}>
        <Input id="content" label="Message" disabled={isLoading} />
        <Button disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </FormProvider>
    </form>
  );
};

export default SendMessageForm;
