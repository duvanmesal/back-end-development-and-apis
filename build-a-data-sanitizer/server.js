
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import {
  inputCleaner,
  inputValidator
} from "./middleware.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Procesar datos enviados desde formularios HTML
app.use(express.urlencoded({ extended: true }));

// Procesar solicitudes JSON
app.use(express.json());

// Redirigir la página principal al formulario
app.get("/", (req, res) => {
  res.redirect("/form");
});

// Mostrar el formulario HTML
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Procesar y validar los datos enviados
app.post(
  "/submit",
  inputCleaner,
  inputValidator,
  (req, res) => {
    const { username, comment } = req.body;

    res.send(`
      <h1>Submission Successful</h1>
      <p>Username: ${username}</p>
      <p>Comment: ${comment || ""}</p>
    `);
  }
);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
