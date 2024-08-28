import bodyParser from 'body-parser';
import express from 'express';
import { router } from './routes/routes';

const app = express();

app.use(bodyParser.json()); // Para parsing de JSON

app.use('/api', router); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});