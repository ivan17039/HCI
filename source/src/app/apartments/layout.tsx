import {Navigation} from "./_components/navigation"
export default function ApartmentsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="bg-gray-100">
        
        {children}
        <Navigation/>
      </section>
    );
  }
  
  