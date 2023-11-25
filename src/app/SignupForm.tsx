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
import { useSignupMutation } from "@/store/slices/userApi";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const formSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  password: string().required(),
});

type SignupProps = {};
const SignupForm: React.FC<SignupProps> = ({}) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const [signup, { isLoading, error }] = useSignupMutation();

  const signupHandler: SubmitHandler<FormValues> = async (data) => {
    await signup(data);
    router.push("/chat");
  };

  return (
    <form onSubmit={form.handleSubmit(signupHandler)}>
      <Alert error={error} />
      <FormProvider {...form}>
        <div className="mt-2">
          <Input id="firstName" label="First Name" disabled={isLoading} />
        </div>
        <div className="mt-2">
          <Input id="lastName" label="Last Name" disabled={isLoading} />
        </div>
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
            {isLoading ? "Signing Up..." : "Sign up"}
          </Button>
        </div>
      </FormProvider>
    </form>
  );
};

export default SignupForm;
