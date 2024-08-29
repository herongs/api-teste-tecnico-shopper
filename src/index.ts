import { AppDataSource, connectDatabase } from "./config/database";
import { Reading } from "./models/Reading";
import { router } from "./routes/routes";

import bodyParser from "body-parser";
import express from "express";
import path from "path";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json()); // Para parsear o corpo das requisições em JSON

app.use("/api", router);

// Configura o diretório estático para servir imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/image/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    const readingRepo = AppDataSource.getRepository(Reading);
    const reading = await readingRepo.findOne({ where: { measure_uuid: uuid } });

    if (reading && reading.image_url) {
      // Redireciona para o URL local
      res.redirect(`${reading.image_url}`);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image' });
  }
});


const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDatabase(); // Conecta ao banco de dados
    app.listen(80, () => {
      console.log("Server running on http://localhost:80");
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
