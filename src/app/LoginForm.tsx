"use client";

import { useRouter } from "next/navigation";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

// Components
import Input from "./components/formElements/Input";
import Button from "./components/Button";
import Alert from "./components/Alert";

//
import { useLoginMutation } from "@/store/slices/userApi";

export type FormValues = {
  email: string;
  password: string;
};

const formSchema = object().shape({
  email: string().required().email(),
  password: string().required(),
});

type LoginFormProps = {};
const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const loginHandler: SubmitHandler<FormValues> = async (data) => {
    await login(data);
    router.push("/chat");
  };

  return (
    <form onSubmit={form.handleSubmit(loginHandler)}>
      <Alert error={error} />
      <FormProvider {...form}>
        <div className="mt-2">
          <Input id="email" label="Email" disabled={isLoading} />
        </div>
        <div className="mt-2">
          <Input
            id="password"
            label="Password"
            disabled={isLoading}
            type="password"
          />
        </div>

        <div className="mt-2">
          <Button disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </div>
      </FormProvider>
    </form>
  );
};

export default LoginForm;
