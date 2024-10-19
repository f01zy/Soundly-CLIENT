import Login from "@/page/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | Soundly`
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage;