import { Request, Response } from "express";
import dotenv from "dotenv";
import { Processo } from "../models/Processo";
import { format, parseISO } from "date-fns";

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

    const novoProcesso = await Processo.create({
      nProcesso,
      nameAutor,
      nameReu,
      situacao,
      createdBy,
      createdAt,
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
    const processos = await Processo.findAll();
    console.log(processos);
    let activeCount = 0;
    let archivedCount = 0;

    const processosFormatados = processos.map((processo) => {
      if (processo.situacao === "Ativo") {
        activeCount++;
      } else if (processo.situacao === "Baixado") {
        archivedCount++;
      }

      return {
        ...processo.toJSON(),
        createdAt: format(
          parseISO(processo.createdAt.toString()),
          "dd/MM/yyyy"
        ),
      };
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
