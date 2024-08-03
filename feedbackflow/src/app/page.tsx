import Navbar from "../components/hero/Navbar";
import Hero from '../components/hero/Hero'
export default function Home() {
  return (
    <main className="">
      <div>
        <Navbar />
      </div>
      <div className="px-4 py-2 max-w-[1000px] mx-auto justify-center items-center mt-5">
        <Hero />
      </div>
      
    </main>
  );
}
