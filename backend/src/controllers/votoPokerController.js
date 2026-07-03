import prisma from "../lib/prisma.js";

/**
 * Listar todos os votos de um card
 */
export const listarVotosCard = async (req, res) => {
  try {
    const { idCard } = req.params;

    const votos = await prisma.votoPoker.findMany({
      where: {
        id_card: idCard,
      },
      include: {
        usuario: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(votos);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar votos",
    });
  }
};

/**
 * Buscar voto de um usuário em um card
 */
export const buscarVoto = async (req, res) => {
  try {

    const { idCard, idUsuario } = req.params;

    const voto = await prisma.votoPoker.findFirst({
      where: {
        id_card: idCard,
        id_usuario: idUsuario,
      },
      include: {
        usuario: true,
        card: true,
      },
    });

    if (!voto) {
      return res.status(404).json({
        error: "Voto não encontrado",
      });
    }

    return res.status(200).json(voto);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar voto",
    });
  }
};

/**
 * Criar voto
 */
export const criarVoto = async (req, res) => {
  try {

    const { idCard } = req.params;
    const { id_usuario, valor } = req.body;

    if (!id_usuario || valor === undefined) {
      return res.status(400).json({
        error: "Usuário e valor são obrigatórios",
      });
    }

    const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55];

    if (!fibonacci.includes(valor)) {
      return res.status(400).json({
        error: "Valor inválido para Planning Poker",
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

    const usuario = await prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const votoExistente = await prisma.votoPoker.findFirst({
      where: {
        id_card: idCard,
        id_usuario,
      },
    });

    if (votoExistente) {
      return res.status(409).json({
        error: "Usuário já votou neste card",
      });
    }

    const voto = await prisma.votoPoker.create({
      data: {
        id_card: idCard,
        id_usuario,
        valor,
      },
      include: {
        usuario: true,
        card: true,
      },
    });

    return res.status(201).json(voto);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao registrar voto",
    });
  }
};

/**
 * Atualizar voto
 */
export const atualizarVoto = async (req, res) => {
  try {

    const { id } = req.params;
    const { valor } = req.body;

    const voto = await prisma.votoPoker.findUnique({
      where: {
        id_voto: id,
      },
    });

    if (!voto) {
      return res.status(404).json({
        error: "Voto não encontrado",
      });
    }

    const votoAtualizado = await prisma.votoPoker.update({
      where: {
        id_voto: id,
      },
      data: {
        valor,
      },
    });

    return res.status(200).json(votoAtualizado);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar voto",
    });
  }
};

/**
 * Remover voto
 */
export const deletarVoto = async (req, res) => {
  try {

    const { id } = req.params;

    const voto = await prisma.votoPoker.findUnique({
      where: {
        id_voto: id,
      },
    });

    if (!voto) {
      return res.status(404).json({
        error: "Voto não encontrado",
      });
    }

    await prisma.votoPoker.delete({
      where: {
        id_voto: id,
      },
    });

    return res.status(200).json({
      mensagem: "Voto removido com sucesso",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao remover voto",
    });
  }
};

/**
 * Reiniciar votação
 */
export const reiniciarVotacao = async (req, res) => {
  try {

    const { idCard } = req.params;

    await prisma.votoPoker.deleteMany({
      where: {
        id_card: idCard,
      },
    });

    return res.status(200).json({
      mensagem: "Votação reiniciada com sucesso",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao reiniciar votação",
    });
  }
};
