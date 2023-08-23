import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import { User, UserInstance } from "../models/User";
import { generateToken } from "../config/passport";


dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, email, cidade, password } = req.body;

  if (!name || !email || !cidade || !password) {
    return res.status(400).json({
      message:
        "Erro ao registrar usuário: Nome, e-mail, cidade e/ou senha não fornecidos.",
    });
  }
  try {
    const hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {
      const passwordHash = await hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        cidade,
        password: passwordHash,
      });
      const token = generateToken({ id: newUser.id });

      return res.status(201).json({
        id: newUser.id,
        token,
        message: "Usuário registrado com sucesso!",
      });
    } else {
      return res.status(400).json({ error: "E-mail já existe." });
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao registrar usuário." });
  }
};

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      const verifyPassword = await compare(password, user.password);

      if (verifyPassword) {
        const token = generateToken({
          id: user.id,
          name: user.name,
          cidade: user.cidade,
        });
        return res.json({ status: true, token });
      }
    }
  }

  res.json({ status: false });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Recuperar os dados do usuário logado da requisição
    const user = req.user;
    // Retornar os dados do usuário como resposta JSON
    res.json(user);
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    res.status(500).json({ error: "Erro ao obter dados do usuário" });
  }
};
