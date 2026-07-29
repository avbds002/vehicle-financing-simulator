import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SimulationPage } from "./pages/SimulationPage";
import { LoginPage } from "./pages/LoginPage";
import { FipeTablePage } from "./pages/FipeTablePage";
import { LoanBookPage } from "./pages/LoanBookPage";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 bg-[url('/background.png')] bg-cover bg-center font-sans text-slate-800">
      <Header />
      <Outlet />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<SimulationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes — require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/fipe" element={<FipeTablePage />} />
            <Route path="/loan-book-page" element={<LoanBookPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
