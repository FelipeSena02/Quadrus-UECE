import prisma from "../lib/prisma.js";

/**
 * Listar anexos de um card
 */
export const listarAnexosCard = async (req, res) => {
  try {
    const { idCard } = req.params;

    const anexos = await prisma.anexoCard.findMany({
      where: {
        id_card: idCard,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(anexos);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar anexos"
    });
  }
};

/**
 * Buscar um anexo
 */
export const buscarAnexoPorId = async (req, res) => {
  try {

    const { id } = req.params;

    const anexo = await prisma.anexoCard.findUnique({
      where: {
        id_anexo: id,
      },
      include: {
        card: true,
      },
    });

    if (!anexo) {
      return res.status(404).json({
        error: "Anexo não encontrado",
      });
    }

    return res.status(200).json(anexo);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar anexo",
    });

  }
};

/**
 * Criar anexo
 */
export const criarAnexo = async (req, res) => {

  try {

    const { idCard } = req.params;

    const {
      nome_arquivo,
      url_arquivo,
      tipo_anexo
    } = req.body;

    if (
      !nome_arquivo ||
      !url_arquivo ||
      !tipo_anexo
    ) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios",
      });
    }

    const card = await prisma.card.findUnique({
      where: {
        id_card: idCard,
      },
    });

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado",
      });
    }

    const anexo = await prisma.anexoCard.create({
      data: {
        id_card: idCard,
        nome_arquivo,
        url_arquivo,
        tipo_anexo,
      },
    });

    return res.status(201).json(anexo);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar anexo",
    });

  }
};

/**
 * Atualizar anexo
 */
export const atualizarAnexo = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nome_arquivo,
      url_arquivo,
      tipo_anexo,
    } = req.body;

    const anexo = await prisma.anexoCard.findUnique({
      where: {
        id_anexo: id,
      },
    });

    if (!anexo) {
      return res.status(404).json({
        error: "Anexo não encontrado",
      });
    }

    const anexoAtualizado = await prisma.anexoCard.update({

      where: {
        id_anexo: id,
      },

      data: {
        nome_arquivo,
        url_arquivo,
        tipo_anexo,
      },

    });

    return res.status(200).json(anexoAtualizado);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar anexo",
    });

  }
};

/**
 * Excluir anexo
 */
export const deletarAnexo = async (req, res) => {

  try {

    const { id } = req.params;

    const anexo = await prisma.anexoCard.findUnique({
      where: {
        id_anexo: id,
      },
    });

    if (!anexo) {

      return res.status(404).json({
        error: "Anexo não encontrado",
      });

    }

    await prisma.anexoCard.delete({

      where: {
        id_anexo: id,
      },

    });

    return res.status(200).json({
      mensagem: "Anexo removido com sucesso",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao remover anexo",
    });

  }
};
