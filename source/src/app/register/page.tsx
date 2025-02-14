import { RegisterForm } from "@/app/register/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Your App Name",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
