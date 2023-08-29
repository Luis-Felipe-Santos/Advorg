import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api";
dotenv.config();

const server = express();


server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ error: "Ocorreu algum erro." });
};
server.use(errorHandler);

server.listen(2000, () => {
  console.log("API server is running on port 2000");
});
