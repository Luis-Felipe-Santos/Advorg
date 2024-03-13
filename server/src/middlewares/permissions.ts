import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const checkPermission = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware de verificação de permissão iniciado");

    const userRole = res.locals.permissao;
    console.log("Permissão do usuário:", userRole);
    console.log("Papéis permitidos:", allowedRoles);

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      console.log("Permissão negada. Retornando erro 403.");
      res
        .status(403)
        .json({ error: "PERMISSAO NEGADA!! Você não tem permissão para acessar a página ou praticar o ato." });

    }
  };
};
