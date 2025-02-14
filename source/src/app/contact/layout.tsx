import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster /> {/* Ovo mora biti tu da bi toastovi radili */}
      {children}
    </>
  );
}
