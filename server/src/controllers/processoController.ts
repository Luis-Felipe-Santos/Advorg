import { Request, Response } from "express";
import dotenv from "dotenv";
import { Processo, ProcessoInstance } from "../models/Processo";
import { format, parseISO } from "date-fns";
import { User } from "../models/User";
import { UserPreposto, UserInstancePreposto } from "../models/UserPreposto";
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
    const loggedInUserId = res.locals.user.id; // ID do usuário logado (preposto ou mestre)

    // Recuperar todos os processos do usuário mestre
    const processosMestre: ProcessoInstance[] = await Processo.findAll({
      where: { users_id: loggedInUserId },
    });

    // Recuperar o usuário preposto associado ao usuário mestre (se houver)
    const preposto: UserInstancePreposto | null = await UserPreposto.findOne({
      where: { id: loggedInUserId }, // Busca pelo ID do preposto
    });

    // Se for preposto e tiver usuário mestre associado, buscar os processos do usuário mestre
    if (preposto && preposto.users_id !== loggedInUserId) {
      const processosMestrePreposto: ProcessoInstance[] = await Processo.findAll({
        where: { users_id: preposto.users_id },
      });

      // Combinar os processos do usuário mestre e do usuário mestre associado ao preposto
      processosMestre.push(...processosMestrePreposto);
    }

    // Se o usuário logado for um usuário mestre, buscar os processos dos prepostos associados
    if (!preposto) {
      const prepostos: UserInstancePreposto[] = await UserPreposto.findAll({
        where: { users_id: loggedInUserId },
      });

      // Para cada preposto associado, buscar os processos e adicionar à lista de processos do mestre
      for (const preposto of prepostos) {
        const processosPreposto: ProcessoInstance[] = await Processo.findAll({
          where: { users_id: preposto.id },
        });

        processosMestre.push(...processosPreposto);
      }
    }

    // Formatar e enviar os dados dos processos na resposta HTTP
    const processosFormatados = processosMestre.map((processo) => ({
      idProcesso: processo.idProcesso,
      nProcesso: processo.nProcesso,
      nameAutor: processo.nameAutor,
      nameReu: processo.nameReu,
      situacao: processo.situacao,
      createdBy: processo.createdBy,
      createdAt: format(parseISO(processo.createdAt.toString()), "dd/MM/yyyy"),
      userId: processo.users_id,
      userName: '', // Você pode adicionar o nome do usuário preposto aqui, se necessário
    }));

    // Contagem de processos ativos e arquivados
    let activeCount = 0;
    let archivedCount = 0;

    processosMestre.forEach((processo) => {
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
