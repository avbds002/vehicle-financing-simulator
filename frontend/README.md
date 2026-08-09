# 🚗 Vehicle Financing Simulator

A web application for simulating vehicle financing using the **Price amortization method** (Tabela Price). Users can input vehicle value, down payment, number of installments, interest rate, and state to receive a detailed financing breakdown including monthly payments, total interest, and final cost.

🔗 **Live Demo:** [https://vehicle-financing-simulator.vercel.app/](https://vehicle-financing-simulator.vercel.app/)

---

## ✨ Features

- **Financing Simulation** — Calculate monthly payments using the Price (Tabela Price) formula: `PMT = PV × [i(1+i)^n] / [(1+i)^n − 1]`
- **Cost Breakdown** — View financed amount, total payable, total interest, and final vehicle value at a glance
- **FIPE Table** — Access the vehicle parts price catalog (Tabela FIPE) *(requires authentication)*
- **Loan Book** — Track and manage saved financing simulations *(requires authentication)*
- **User Registration & Authentication** — Full sign-up flow with CPF validation, email verification, age check (≥ 18), and secure login
- **Form Validation** — Comprehensive client-side validation for both simulation and registration forms
- **Responsive Design** — Fully responsive layout optimized for desktop and mobile devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Routing** | [React Router DOM 7](https://reactrouter.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/                        # Navigation header
│   ├── LoginPageComponents/           # Login & registration UI
│   │   ├── FormAlert/                 # Success/error alert banners
│   │   ├── FormFooterLink/            # Form footer navigation links
│   │   ├── RegisterForm/              # User registration form
│   │   ├── SignInForm/                # User sign-in form
│   │   ├── SubmitButton/              # Reusable submit button
│   │   └── TextInput/                 # Reusable text input component
│   ├── ProtectedRoute/                # Auth guard for private routes
│   └── SimulationPageComponents/      # Simulation UI
│       ├── CostBreakdown/             # Financing cost details card
│       ├── MonthlyPaymentCard/        # Monthly payment display card
│       ├── RangeInput/                # Range slider input component
│       └── SimulationForm/            # Simulation input form
├── constants/
│   └── brazilianStates.ts             # Brazilian states list (UF)
├── hooks/
│   ├── useAuth.ts                     # Authentication state management
│   ├── useFinancingCalculation.ts     # Price amortization calculation
│   └── useSimulation.ts              # Simulation history management
├── pages/
│   ├── FipeTablePage.tsx              # FIPE table page (protected)
│   ├── LoanBookPage.tsx               # Loan book page (protected)
│   ├── LoginPage.tsx                  # Login/register page
│   └── SimulationPage.tsx             # Main simulation page
├── utils/
│   ├── formatCurrency.ts             # BRL currency formatter
│   ├── validateRegisterForm.ts       # Registration form validation & CPF utils
│   └── validateSimulationForm.ts     # Simulation form validation
├── types.ts                           # Shared TypeScript interfaces
├── App.tsx                            # App routes & layout
└── main.tsx                           # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vehicle-financing-simulator.git
cd vehicle-financing-simulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📐 Financing Formula

The simulator uses the **Price amortization system** (Tabela Price), which is the most common method for vehicle financing in Brazil. The monthly payment is calculated as:

```
PMT = PV × [ i × (1 + i)^n ] / [ (1 + i)^n − 1 ]
```

Where:
- **PV** = Financed amount (vehicle value − down payment)
- **i** = Monthly interest rate (as decimal)
- **n** = Number of installments

---

## 📄 License

This project is private.
