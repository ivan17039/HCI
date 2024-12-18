import { Navigation } from "../guest-experience/_components/navigation";

export default function ShowcaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mt-20">
            <Navigation />
            {children}
        </section>
    );
}