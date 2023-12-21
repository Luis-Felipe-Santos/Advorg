import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import { User, UserInstance } from "../models/User";
import { UserPreposto, UserInstancePreposto } from "../models/UserPreposto";
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
      console.log("password:", typeof password);
      const newUser = await User.create({
        name,
        email,
        cidade,
        password: passwordHash,
        permissao: "Master",
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
    const email: string = req.body.email;
    const password: string = req.body.password;

    console.log("Tentativa de login com email:", email);

    // Primeiro, tente encontrar o usuário na tabela User
    const user: UserInstance | null = await User.findOne({
      where: { email },
    });

    console.log("Resultado da busca na tabela User:", user);

    if (!user) {
      console.log("Usuário não encontrado na tabela User");

      // Se não encontrar o usuário na tabela User, tente na tabela UserPreposto
      const preposto: UserInstancePreposto | null = await UserPreposto.findOne({
        where: { email },
      });

      console.log("Resultado da busca na tabela UserPreposto:", preposto);

      if (preposto) {
        const isPasswordValid = await compare(password, preposto.password);
        console.log("Senha fornecida durante o login:", password);
        console.log("Senha hashada no banco de dados:", preposto.password);
        console.log("Verificação de senha:", isPasswordValid);

        if (isPasswordValid) {
          const token = generateToken({
            id: preposto.id,
            name: preposto.name,
            cidade: preposto.cidade,
            permissao: preposto.permissao,
          });

          console.log("Token gerado com sucesso:", token);

          return res.json({ status: true, token });
        } else {
          console.log("Senha incorreta");
        }
      } else {
        console.log("Usuário não encontrado na tabela UserPreposto");
      }
    } else {
      const isPasswordValid = await compare(password, user.password);
      console.log("Senha fornecida durante o login:", password);
      console.log("Senha hashada no banco de dados:", user.password);
      console.log("Verificação de senha:", isPasswordValid);

      if (isPasswordValid) {
        const token = generateToken({
          id: user.id,
          name: user.name,
          cidade: user.cidade,
          permissao: user.permissao,
        });

        console.log("Token gerado com sucesso:", token);

        return res.json({ status: true, token });
      } else {
        console.log("Senha incorreta");
      }
    }
  } else {
    console.log("Dados de login incompletos");
  }

  res.json({ status: false });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Recuperar os dados do usuário logado da requisição
    const user = res.locals.user;
    // Retornar os dados do usuário como resposta JSON
    res.json(user);
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    res.status(500).json({ error: "Erro ao obter dados do usuário" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user!.id; // Obtém o ID do usuário logado

    const { name, email, cidade, newPassword } = req.body; // Novos dados do perfil

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (newPassword) {
      const newPasswordHash = await hash(newPassword, 10);
      user.password = newPasswordHash;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.cidade = cidade || user.cidade;
    await user.save();

    res.json({ message: "Perfil atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar perfil do usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar perfil do usuário" });
  }
};
