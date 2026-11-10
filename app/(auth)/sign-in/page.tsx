"use client";

import AuthForm, { AuthFormData } from "@/components/auth/AuthForm";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const handleSignIn = async (data: AuthFormData) => {
    const { data: signInResponse, error } =
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

    if (error) {
      console.error("Sign In Error:", error);
      throw new Error(error.message);
    }

    console.log("Sign In Response:", signInResponse);
  };

  return (
    <AuthForm
      mode="sign-in"
      onSubmit={handleSignIn}
    />
  );
};

export default SignInPage;
