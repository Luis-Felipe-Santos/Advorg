import { Request, Response } from "express";
import { hash } from "bcrypt";
import dotenv from "dotenv";
import { UserPreposto, UserInstancePreposto } from "../models/UserPreposto";
import { generateToken } from "../config/passport";
import { format, parseISO } from "date-fns";
import { User } from "../models/User";


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
      console.log("Senha hashada:", passwordHash);
      console.log("loggedInUserId:", loggedInUserId);
      console.log("password:", typeof password);
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

      const token = generateToken({ id: newUserPreposto.id});

      console.log("Token gerado:", token);

      return res.status(201).json({
        id: newUserPreposto.id,
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
    const loggedInUserId = res.locals.user.id;

    // Retrieve preposto users associated with the logged-in user
    const usuariosprepostos: UserInstancePreposto[] = await UserPreposto.findAll({
      where: { users_id: loggedInUserId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
    });

    // Map and format the retrieved data
    const usuariosprepostosFormatados = usuariosprepostos.map((usuario) => ({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      cidade: usuario.cidade,
      permissao: usuario.permissao,
      createdAt: format(parseISO(usuario.createdAt.toString()), "dd/MM/yyyy"),
      userId: usuario.user ? usuario.users_id : null,
      userName: usuario.user ? usuario.user.name : null,
    }));

    // If no preposto users are found, return a 404 response
    if (!usuariosprepostos || usuariosprepostos.length === 0) {
      return res.status(404).json({ error: "Nenhum usuário preposto encontrado." });
    }

    // Return the formatted preposto user data
    return res.status(200).json(usuariosprepostosFormatados);
  } catch (error) {
    console.error("Erro ao obter dados dos usuários prepostos:", error);
    return res.status(500).json({ error: "Erro interno ao obter dados dos usuários prepostos." });
  }
};

export const deleteUserPreposto = async (req: Request, res: Response) => {
  try {
    const { iduserPreposto } = req.params;

    const userpreposto = await UserPreposto.findByPk(iduserPreposto);

    if (!userpreposto) {
      return res.status(404).json({ error: "Usuário preposto não encontrado." });
    }

    await userpreposto.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir usuário preposto:", error);
    return res.status(500).json({ error: "Erro interno ao excluir usuário preposto." });
  }
};
