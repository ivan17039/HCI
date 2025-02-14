import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white  rounded-lg p-4 ${className}`}>{children}</div>
  );
}

export function CardContent({ children }: CardProps) {
  return <div className="mt-2">{children}</div>;
}

export function CardTitle({ children }: CardProps) {
  return <h2 className="text-xl font-bold mb-2 text-primary">{children}</h2>;
}

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Input({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded-md ${className}`}
    />
  );
}
