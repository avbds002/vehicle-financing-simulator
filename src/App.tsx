import { Header } from "./components/Header";
import { SimulationForm } from "./components/SimulationForm";

export function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 bg-[url('/background.png')] bg-cover bg-center font-sans text-slate-800">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:p-12">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              {/*LEFT COLUMN: form*/}
              <SimulationForm />
            </div>
            <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
              {/*Right column: results grid*/}
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
