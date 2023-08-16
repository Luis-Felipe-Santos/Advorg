import express, { Request, Response } from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
  res.send("Ola Mundo");
});

server.listen(80);
