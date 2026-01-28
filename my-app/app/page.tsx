import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import FlightResults from '@/components/FlightResults';
import AdPanel from '@/components/AdPanel';
import Footer from '@/components/Footer';
import { FlightSearchProvider } from '@/lib/FlightSearchContext';

export default function Home() {
  return (
    <FlightSearchProvider>
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          <aside className="lg:col-span-3 w-full min-w-0">
            <FilterPanel />
          </aside>

          <section className="lg:col-span-6 w-full min-w-0">
            <FlightResults />
          </section>

          <aside className="lg:col-span-3 w-full min-w-0">
            <AdPanel />
          </aside>
          
        </div>
      </main>

      <Footer />
    </div>
    </FlightSearchProvider>
  );
}
