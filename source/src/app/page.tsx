import Link from "next/link";
export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight text-primary mb-6">Home Page</h1>
      
      <p className="leading-relaxed text-lg mb-4">
        Welcome to our site!
      </p>
      <Link href="/booking">
      <button className="bg-primary text-white font-semibold py-2 px-4 rounded shadow hover:bg-accent transition duration-300 ease-in-out mb-8">
        Book Now!
      </button>
      </Link>
      <div className="flex gap-6">
        <div className="card w-80 p-4">
          <h2 className="text-2xl font-bold text-primary">Apartman 1</h2>
          <p className="text-foreground mt-2">A beautiful apartment by the sea with all the amenities you need.</p>
        </div>

        <div className="card w-80 p-4">
          <h2 className="text-2xl font-bold text-primary">Apartman 2</h2>
          <p className="text-foreground mt-2">An ideal place for relaxation and enjoyment.</p>
        </div>
      </div>

      <footer className="footer mt-10">
        <p>&copy; 2024 Apartments by the coast. All rights reserved.</p>
      </footer>
    </main>
  );
}
