import prisma from "../lib/prisma.js";

/* =========================
   CRIAR CARD EM UM PROJETO
========================= */
export const criarCard = async (req, res) => {
  const { id } = req.params; // id do projeto
  const {
    titulo,
    descricao,
    prioridade,
    tags,
    id_responsavel,
    id_sprint,
  } = req.body;

  try {
    if (!titulo) {
      return res.status(400).json({
        error: "Título é obrigatório",
      });
    }

    const projeto = await prisma.projeto.findUnique({
      where: { id_projeto: id },
    });

    if (!projeto) {
      return res.status(404).json({
        error: "Projeto não encontrado",
      });
    }

    const card = await prisma.card.create({
      data: {
        id_projeto: id,
        titulo,
        descricao: descricao || null,
        prioridade: prioridade || "MEDIA",
        status: "A_FAZER",
        tags: tags || [],
        id_responsavel: id_responsavel || null,
        id_sprint: id_sprint || null,
      },
      include: {
        responsavel: true,
      },
    });

    return res.status(201).json(card);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao criar card",
    });
  }
};

/* =========================
   LISTAR CARDS DE UM PROJETO
========================= */
export const listarCards = async (req, res) => {
  const { id } = req.params;

  try {
    const projeto = await prisma.projeto.findUnique({
      where: { id_projeto: id },
    });

    if (!projeto) {
      return res.status(404).json({
        error: "Projeto não encontrado",
      });
    }

    const cards = await prisma.card.findMany({
      where: {
        id_projeto: id,
        deletado_em: null,
      },
      include: {
        responsavel: true,
        sprint: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(cards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao listar cards",
    });
  }
};

/* =========================
   BUSCAR CARD POR ID
========================= */
export const buscarCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { id_card: id },
      include: {
        responsavel: true,
        sprint: true,
        projeto: true,
        anexos: true,
        votos: true,
      },
    });

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado",
      });
    }

    return res.json(card);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar card",
    });
  }
};

/* =========================
   ATUALIZAR CARD
========================= */
export const atualizarCard = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    prioridade,
    tags,
    id_responsavel,
    id_sprint,
    story_points,
    em_risco,
  } = req.body;

  try {
    const card = await prisma.card.findUnique({
      where: { id_card: id },
    });

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado",
      });
    }

    const cardAtualizado = await prisma.card.update({
      where: { id_card: id },
      data: {
        titulo,
        descricao,
        prioridade,
        tags,
        id_responsavel,
        id_sprint,
        story_points,
        em_risco,
      },
      include: {
        responsavel: true,
        sprint: true,
      },
    });

    return res.json(cardAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao atualizar card",
    });
  }
};

/* =========================
   EXCLUIR CARD (SOFT DELETE)
========================= */
export const excluirCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { id_card: id },
    });

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado",
      });
    }

    await prisma.card.update({
      where: { id_card: id },
      data: {
        deletado_em: new Date(),
      },
    });

    return res.json({
      message: "Card removido com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao excluir card",
    });
  }
};

/* =========================
   ATUALIZAR STATUS (KANBAN)
========================= */
export const atualizarStatusCard = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "A_FAZER",
    "EM_ANDAMENTO",
    "HOMOLOGACAO",
    "CONCLUIDO",
  ];

  try {
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status inválido: ${validStatuses.join(", ")}`,
      });
    }

    const card = await prisma.card.findUnique({
      where: { id_card: id },
    });

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado",
      });
    }

    const cardAtualizado = await prisma.card.update({
      where: { id_card: id },
      data: { status },
      include: {
        responsavel: true,
        sprint: true,
      },
    });

    return res.json(cardAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao atualizar status do card",
    });
  }
};