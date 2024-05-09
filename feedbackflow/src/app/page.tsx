import Navbar from "../components/hero/Navbar";
import Hero from '../components/hero/Hero'
export default function Home() {
  return (
    <main className="px-4 py-2">
      <div>
        <Navbar />
      </div>
      <div className="mt-5">
        <Hero />
      </div>
      
    </main>
  );
}
