
import { Router } from "express";

const router = Router();

// Ruta principal
router.get("/", (req, res) => {
  res.send("API is available!");
});

// Error interno del servidor
router.get("/crash", (req, res, next) => {
  const err = new Error("Database connection failed.");
  next(err);
});

// Error de solicitud incorrecta
router.get("/bad-request", (req, res, next) => {
  const err = new Error("Client-side data is missing.");
  err.status = 400;
  next(err);
});

export default router;
