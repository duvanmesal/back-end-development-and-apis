
import express from "express";

import apiRouter from "./routes/api.routes.js";

import {
  notFoundHandler,
  finalErrorHandler
} from "./middleware/error.middleware.js";

const app = express();

// Logger de solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Procesamiento de JSON
app.use(express.json());

// Procesamiento de formularios
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api", apiRouter);

// Middleware para rutas inexistentes
app.use(notFoundHandler);

// Middleware final de errores
app.use(finalErrorHandler);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
