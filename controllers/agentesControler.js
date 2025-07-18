const agentesRepository = require(`../repositories/agentesRepository`);
const mensagemErro = `Campo Obrigatório!`;


function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll();
    res.json(agentes);
};

function createAgente(req, res){
    const {nome, dataDeIncorporacao, cargo} = req.body;

    if (!nome || !dataDeIncorporacao || !cargo){
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

    const novoAgente = agentesRepository.create({nome, dataDeIncorporacao, cargo});
    res.status(201).json(novoAgente);
}

module.exports = {
    getAllAgentes,
    createAgente,
};


