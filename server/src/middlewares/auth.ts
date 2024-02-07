import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";
import { UserPreposto } from "../models/UserPreposto";

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
          const { id, permissao } = JWT.verify(
            token,
            process.env.JWT_SECRET as string
          ) as { id: number; permissao: string };

          console.log("Token decodificado:", { id, permissao });

          const user = await User.findOne({ where: { id } });

          if (!user) {
            const preposto = await UserPreposto.findOne({ where: { id } });
            if (preposto) {
              res.locals.user = preposto;
              res.locals.permissao = permissao;
              success = true;
            }
          } else {
            res.locals.user = user;
            res.locals.permissao = permissao;
            success = true;
          }
        } catch (err) {
          console.error("Erro ao verificar o token:", err);
          res.status(401).json({ error: "Token inválido" });
        }
      }
    }

    if (success) {
      console.log("Usuário autenticado com sucesso");
      next();
    } else {
      console.log("Falha na autenticação do usuário");
      res.status(403).json({ error: "Não autorizado" });
    }
  },
};
