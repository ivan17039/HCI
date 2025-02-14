export default function ApartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-secondary">{children}</section>;
}
