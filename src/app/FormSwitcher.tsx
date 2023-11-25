"use client";

import { useState } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const FormSwitcher = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <ul>
        <li>
          <button onClick={() => setIsLogin(true)}>Login</button>
        </li>
        <li>
          <button onClick={() => setIsLogin(false)}>Signup</button>
        </li>
      </ul>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </>
  );
};

export default FormSwitcher;
