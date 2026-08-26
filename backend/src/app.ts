import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController';
import { SimulationController } from './controllers/SimulationController';
import { LoanBookController } from './controllers/LoanBookController';
import { FipeController } from './controllers/FipeController';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

const app = express();

// -----------------------------------------------------------------------
// Middlewares globais
// -----------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------------------------------
// Health Check
// -----------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Vehicle Financing Simulator API is running',
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------------------------------------------------
// Rotas de Autenticação (Públicas)
// POST /api/auth/register
// POST /api/auth/login
// -----------------------------------------------------------------------
app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);

// -----------------------------------------------------------------------
// Rotas de Simulação (Pública)
// POST /api/simulations/calculate
// -----------------------------------------------------------------------
app.post('/api/simulations/calculate', SimulationController.calculate);

// -----------------------------------------------------------------------
// Rotas do Livro de Financiamentos (Privadas — requerem JWT)
// POST   /api/loan-book
// GET    /api/loan-book
// DELETE /api/loan-book/:id
// -----------------------------------------------------------------------
app.post('/api/loan-book', authMiddleware, LoanBookController.save);
app.get('/api/loan-book', authMiddleware, LoanBookController.list);
app.delete('/api/loan-book/:id', authMiddleware, LoanBookController.remove);

// -----------------------------------------------------------------------
// Rotas da Tabela FIPE (Privadas — requerem JWT)
// GET /api/fipe/vehicles
// GET /api/fipe/vehicles/:id
// GET /api/fipe/filter-options
// -----------------------------------------------------------------------
app.get('/api/fipe/filter-options', authMiddleware, FipeController.getFilterOptions);
app.get('/api/fipe/vehicles', authMiddleware, FipeController.search);
app.get('/api/fipe/vehicles/:id', authMiddleware, FipeController.getById);

// -----------------------------------------------------------------------
// Rota 404 — Endpoint não encontrado
// -----------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// -----------------------------------------------------------------------
// Middleware de tratamento de erros (deve ser o último)
// -----------------------------------------------------------------------
app.use(errorHandlerMiddleware);

export default app;
