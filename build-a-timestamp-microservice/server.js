
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Devuelve la fecha actual si no se proporciona una fecha
app.get("/api", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Convierte una fecha recibida como parámetro
app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // Si es un número, se interpreta como timestamp en milisegundos
  if (/^-?\d+$/.test(date)) {
    parsedDate = new Date(Number(date));
  } else {
    parsedDate = new Date(date);
  }

  // Verifica si la fecha es válida
  if (Number.isNaN(parsedDate.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Devuelve la fecha en los dos formatos solicitados
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
