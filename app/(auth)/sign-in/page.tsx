import type { Metadata } from "next"
import AuthForm from "@/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Sign In",
}

const SignInPage = () => {
  return <AuthForm mode="sign-in" />
}

export default SignInPage
