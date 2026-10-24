
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import weatherRouter from "./weather.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Información de la API
app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: [
      "/api/info",
      "/api/status",
      "/api/greet/:name",
      "/api/data",
      "/api/weather",
      "/api/weather/:city"
    ]
  });
});

// Estado del servidor
app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Redirección a documentación
app.get("/docs", (req, res) => {
  res.redirect("/api/info");
});

// Saludo personalizado
app.get("/api/greet/:name", (req, res) => {
  const { name } = req.params;

  res.status(200).json({
    message: `Hello, ${name}!`,
    name: name
  });
});

// Rutas GET y POST encadenadas
app.route("/api/data")
  .get((req, res) => {
    res.json({
      message: "Data retrieved successfully"
    });
  })
  .post((req, res) => {
    res.status(201).json({
      message: "Data created successfully"
    });
  });

// Rutas meteorológicas
app.use("/api/weather", weatherRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
