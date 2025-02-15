"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <FaExclamationTriangle className="text-red-500 text-6xl animate-bounce" />
      <h1 className="text-5xl font-extrabold text-gray-800 mt-4">Oops!</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-2">
        404 - Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        Try checking the URL or return to the homepage.
      </p>
      <Link href="/" className="nav-linkbtn mt-4">
        Go Home
      </Link>
    </div>
  );
}
