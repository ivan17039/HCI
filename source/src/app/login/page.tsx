import { LoginForm } from "@/app/login/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Your App Name",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary px-4 sm:px-6 lg:px-8 text-gray-700">
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
