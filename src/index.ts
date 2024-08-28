import express from 'express';
import { connectDatabase } from './config/database';
import { router } from './routes/routes';

const app = express();

app.use(express.json()); // Para parsear o corpo das requisições em JSON
app.use('/api', router);

const startServer = async () => {
  try {
    console.log('Starting server...');

    await connectDatabase(); // Conecta ao banco de dados
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();


