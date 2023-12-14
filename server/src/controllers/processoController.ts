import { Request, Response } from "express";
import dotenv from "dotenv";
import { Processo, ProcessoInstance } from "../models/Processo";
import { format, parseISO } from "date-fns";
import { User } from "../models/User";

dotenv.config();

export const registerProcesso = async (req: Request, res: Response) => {
  const { nProcesso, nameAutor, nameReu, situacao } = req.body;

  if (!nProcesso || !nameAutor || !nameReu || !situacao) {
    return res.status(400).json({
      message: "Erro ao cadastrar processo: Todos os campos são obrigatórios.",
    });
  }

  try {
    const createdBy = res.locals.user.name;
    const createdAt = new Date();
    const users_id = res.locals.user.id;

    const novoProcesso = await Processo.create({
      nProcesso,
      nameAutor,
      nameReu,
      situacao,
      createdBy,
      createdAt,
      users_id,
    });

    return res.status(201).json({
      id: novoProcesso.idProcesso,
      message: "Processo cadastrado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao cadastrar processo:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao cadastrar processo." });
  }
};
export const getProcessos = async (req: Request, res: Response) => {
  try {

    const loggedInUserId = res.locals.user?.id;

    if (!res.locals.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const processos: ProcessoInstance[] = await Processo.findAll({
      where: { users_id: loggedInUserId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
    });

    const processosFormatados = processos.map((processo) => ({
      idProcesso: processo.idProcesso,
      nProcesso: processo.nProcesso,
      nameAutor: processo.nameAutor,
      nameReu: processo.nameReu,
      situacao: processo.situacao,
      createdBy: processo.createdBy,
      createdAt: format(parseISO(processo.createdAt.toString()), "dd/MM/yyyy"),
      userId: processo.user ? processo.users_id : null,
      userName: processo.user ? processo.user.name : null,
    }));

    let activeCount = 0;
    let archivedCount = 0;

    processos.forEach((processo) => {
      if (processo.situacao === "Ativo") {
        activeCount++;
      } else if (processo.situacao === "Baixado") {
        archivedCount++;
      }
    });

    const processCounts = {
      active: activeCount,
      archived: archivedCount,
    };

    res.json({ processos: processosFormatados, counts: processCounts });
  } catch (error) {
    console.error("Erro ao obter dados dos processos:", error);
    res.status(500).json({ error: "Erro ao obter dados dos processos" });
  }
};

export const deleteProcesso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Suponha que o parâmetro seja passado na URL

    const processo = await Processo.findByPk(id);

    if (!processo) {
      return res.status(404).json({ error: "Processo não encontrado" });
    }

    await processo.destroy(); // Isso irá excluir o registro do banco de dados

    return res.status(200).json({ message: "Processo excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir processo:", error);
    return res.status(500).json({ error: "Erro interno ao excluir processo" });
  }
};
