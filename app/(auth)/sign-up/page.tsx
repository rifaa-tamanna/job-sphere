"use client";

import AuthForm, { AuthFormData } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const handleSignUp = async (data: AuthFormData) => {
    if (!data.name) {
      throw new Error("Name is required");
    }

    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

    if (error) {
      console.error("Sign Up Error:", error);
      throw new Error(error.message);
    }

    console.log("Sign Up Response:", signUpResponse);
  };

  return (
    <AuthForm
      mode="sign-up"
      onSubmit={handleSignUp}
    />
  );
};

export default SignUpPage;
