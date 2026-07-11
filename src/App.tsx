import { Header } from "./components/Header";
import { SimulationForm } from "./components/SimulationForm";

export function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 bg-[url('/background.png')] bg-cover bg-center font-sans text-slate-800">
        <Header />
        <main className="mx-auto max-w-7xl p-6 lg:p-12">
          <div className="grid grid-cols-2 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {/*LEFT COLUMN: form*/}
              <SimulationForm />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-7">
              {/*Right column: results grid*/}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
