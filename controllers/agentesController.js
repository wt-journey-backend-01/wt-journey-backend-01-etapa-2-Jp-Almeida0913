const agentesRepository = require(`../repositories/agentesRepository`);
const { isValidDate } = require(`../utils/validator`);
const mensagemErro = `Campo Obrigatório!`;

function getAgentes(req, res) {
    const { cargo, sort } = req.query;

    let agentes = agentesRepository.findAll();

    if (cargo) {
        agentes = agentes.filter(a => a.cargo === cargo);
    }

    if (sort === 'asc') {
        agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (sort === 'desc') {
        agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }

    return res.status(200).json(agentes);
}

function getAgenteById(req, res) {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    if (!agente) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(agente);
}

function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                nome: !nome ? mensagemErro : undefined,
                dataDeIncorporacao: !dataDeIncorporacao ? mensagemErro : undefined,
                cargo: !cargo ? mensagemErro : undefined,
            },
        });
    }

    if (!isValidDate(dataDeIncorporacao)) {
        return res.status(400).json({
            status: 400,
            message: "Data de incorporação inválida ou futura",
            errors: {
                dataDeIncorporacao: "Formato esperado: YYYY-MM-DD. Não pode ser futura."
            }
        });
    }

    const novoAgente = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(novoAgente);
}

function atualizarAgente(req, res) {
    const { id } = req.params;
    const novoAgente = req.body;

    if (novoAgente.id && novoAgente.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    if (!novoAgente.nome || !novoAgente.dataDeIncorporacao || !novoAgente.cargo) {
        return res.status(400).json({
            status: 400,
            message: "Campos obrigatórios ausentes para atualização completa.",
            errors: {
                nome: !novoAgente.nome ? mensagemErro : undefined,
                dataDeIncorporacao: !novoAgente.dataDeIncorporacao ? mensagemErro : undefined,
                cargo: !novoAgente.cargo ? mensagemErro : undefined
            }
        });
    }

    if (!isValidDate(novoAgente.dataDeIncorporacao)) {
        return res.status(400).json({
            message: "Data de incorporação inválida",
            errors: {
                dataDeIncorporacao: "Formato inválido ou data futura"
            }
        });
    }

    const atualizado = agentesRepository.update(id, novoAgente);

    if (!atualizado) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(atualizado);
}

function atualizarParcialAgente(req, res) {
    const { id } = req.params;
    const campos = req.body;

    if (campos.id && campos.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    if (campos.dataDeIncorporacao && !isValidDate(campos.dataDeIncorporacao)) {
        return res.status(400).json({
            message: "Data de incorporação inválida",
            errors: {
                dataDeIncorporacao: "Formato inválido ou data futura"
            }
        });
    }

    const atualizado = agentesRepository.update(id, campos);

    if (!atualizado) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(atualizado);
}

function deletarAgente(req, res) {
    const { id } = req.params;

    const removido = agentesRepository.remove(id);

    if (!removido) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(204).send();
}

module.exports = {
    getAgentes,
    getAgenteById,
    createAgente,
    atualizarAgente,
    atualizarParcialAgente,
    deletarAgente,
};