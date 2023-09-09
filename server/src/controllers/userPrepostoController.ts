import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import { UserPreposto } from "../models/UserPreposto";
import { generateToken } from "../config/passport";
import { format } from "date-fns";

dotenv.config();

export const registerUserPreposto = async (req: Request, res: Response) => {
  const { name, email, cidade, password, permissao } = req.body;
  const loggedInUserId = res.locals.user.id; // Obtém o ID do usuário logado

  console.log("Dados recebidos do frontend:", req.body);

  if (!name || !email || !cidade || !password || !permissao) {
    console.log("Campos ausentes:", req.body);

    return res.status(400).json({
      message:
        "Erro ao cadastrar usuário preposto: Nome, e-mail, cidade, senha e/ou permissão não fornecidos.",
    });
  }

  try {
    // Verifica se o usuário com o email já existe na tabela UserPreposto
    const hasUser = await UserPreposto.findOne({ where: { email } });

    console.log("Resultado da verificação de email:", hasUser);

    if (!hasUser) {
      const createdAt = new Date();
      const passwordHash = await hash(password, 10);
      console.log("loggedInUserId:", loggedInUserId);
      const newUserPreposto = await UserPreposto.create({
        name,
        email,
        cidade,
        password: passwordHash,
        permissao,
        users_id: loggedInUserId,
        createdAt,
      });

      console.log("Novo usuário preposto criado:", newUserPreposto);

      const token = generateToken({ id: newUserPreposto.iduserPreposto });

      return res.status(201).json({
        id: newUserPreposto.iduserPreposto,
        token,
        message: "Usuário preposto cadastrado com sucesso!",
      });
    } else {
      return res.status(400).json({ error: "E-mail já existe." });
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário preposto:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao cadastrar usuário preposto." });
  }
};
export const getUserPrepostoData = async (req: Request, res: Response) => {
  try {
    // Recupere todos os usuários prepostos da tabela
    const usuariosprepostos = await UserPreposto.findAll();

    // Se não houver usuários prepostos, retorne uma resposta vazia ou uma mensagem adequada
    if (!usuariosprepostos || usuariosprepostos.length === 0) {
      return res.status(404).json({ error: "Nenhum usuário preposto encontrado." });
    }
    const usersPrepostoFormatado = usuariosprepostos.map((usuariospreposto) => ({
      ...usuariospreposto.toJSON(),
      createdAt: format(new Date(usuariospreposto.createdAt), "dd/MM/yyyy"),
    }));

    return res.status(200).json(usersPrepostoFormatado);
  } catch (error) {
    console.error("Erro ao obter dados dos usuários prepostos:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao obter dados dos usuários prepostos." });
  }
};
