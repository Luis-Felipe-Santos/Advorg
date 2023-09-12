import { Request, Response } from "express";
import dotenv from "dotenv";
import { Processo } from "../models/Processo";
import {format, parseISO} from "date-fns";


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
    // Recuperar os dados de processos do banco de dados
    const processos = await Processo.findAll();
  
    const processosFormatados = processos.map((processo) => ({
      ...processo.toJSON(),
      createdAt: format(parseISO(processo.createdAt.toString()), "dd/MM/yyyy"),
    }));
   
    console.log("Processos depois de formatados", processosFormatados); 
    // Retornar os dados de processos como resposta JSON
    res.json(processosFormatados);
  } catch (error) {
    console.error("Erro ao obter dados dos processos:", error);
    res.status(500).json({ error: "Erro ao obter dados dos processos" });
  }
};
