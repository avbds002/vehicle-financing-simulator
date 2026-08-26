import 'dotenv/config';
import app from './app';

const port = process.env.PORT ?? 3333;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`🏥 Health check: http://localhost:${port}/api/health`);
});
