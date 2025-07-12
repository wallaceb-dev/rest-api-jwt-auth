import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Rodando em http://localhost:${process.env.PORT}`)
);

export default app;
