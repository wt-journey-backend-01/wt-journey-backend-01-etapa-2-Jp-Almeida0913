const casosRepository = require(`../repositories/casosRepository`);
const agentesRepository = require(`../repositories/agentesRepository`);

const mensagemErro = `Campo Obrigatório!`;


function getAllCasos(req, res) {
    const casos = casosRepository.findAll();
    res.json(casos);
}

function createCaso(req, res){
    const{titulo, descricao, status, agente_id} = req.body;

    if (!titulo || !descricao || !status || !agente_id){
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                titulo: !titulo ? mensagemErro : undefined,
                descricao: !descricao ? mensagemErro : undefined,
                status: !status ? mensagemErro : undefined,
                agente_id: !agente_id ? mensagemErro : undefined,
            },
        });
    }

    if (status !== `aberto` && status !== `solucionado`){
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors:{
                status: "O campo `status` pode ser somente `aberto` ou `solucionado`",
            },
        });
    }

    const agenteExiste = agentesRepository.findAll().some((agente) => agente.id === agente_id);

    if (!agenteExiste){
        return res.status(404).json({
            status: 404,
            message: `Agente responsável não encontrado`,
        });
    }

    const novoCaso = casosRepository.create({titulo, descricao, status, agente_id});
    res.status(201).json(novoCaso);
}

module.exports = {
    getAllCasos,
    createCaso,
};