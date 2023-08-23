import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    let success = false;

    // Fazer verificação de auth
    if (req.headers.authorization) {
      // Bearer token
      const [authType, token] = req.headers.authorization.split(" ");
      if (authType === "Bearer") {
        try {
          const decodedToken = JWT.verify(token, process.env.JWT_SECRET as string) as { id: string };
          const user = await User.findOne({ where: { id: decodedToken.id } });
          

          if (user) {
            req.user = user; // Adiciona os dados do usuário à requisição
            success = true;

          }
        } catch (err) {
          // Se houver um erro ao verificar o token, trate-o e responda com erro
          console.error("Erro ao verificar o token:", err);
          res.status(401).json({ error: "Token inválido" }); // Respond with an appropriate error message
        }
      }
    }

    if (success) {
      next();
    } else {
      res.status(403).json({ error: "Não autorizado" }); // Não permitido
    }
  },
};