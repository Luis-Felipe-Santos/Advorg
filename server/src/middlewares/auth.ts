import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();
export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware de autenticação iniciado");

    let success = false;

    if (req.headers.authorization) {
      console.log("Cabeçalho de autorização presente");

      const [authType, token] = req.headers.authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decodedToken = JWT.verify(
            token,
            process.env.JWT_SECRET as string
          ) as { id: number };

          const user = await User.findOne({ where: { id: decodedToken.id } });

          if (user) {
            res.locals.user = user;
            success = true;
          }
        } catch (err) {
          console.error("Erro ao verificar o token:", err);
          res.status(401).json({ error: "Token inválido" });
        }
      }
    }
    if (success) {
      next();
    } else {
      res.status(403).json({ error: "Não autorizado" });
    }
  },
};
