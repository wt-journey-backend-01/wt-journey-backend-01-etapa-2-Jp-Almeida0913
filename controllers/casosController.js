const casosRepository = require(`../repositories/casosRepository`);
const agentesRepository = require(`../repositories/agentesRepository`);

const mensagemErro = `Campo Obrigatório!`;


function getCasos(req, res) {
    const { tipo, status, sort } = req.query;

    let casos = casosRepository.findAll();


    if (tipo) {
        casos = casos.filter(c => c.tipo === tipo);
    }

    if (status) {
        casos = casos.filter(c => c.status === status);
    }

    if (sort) {
        if (sort === 'asc') {
            casos.sort((a, b) => new Date(a.data) - new Date(b.data));
        } else if (sort === 'desc') {
            casos.sort((a, b) => new Date(b.data) - new Date(a.data));
        }
    }

    return res.status(200).json(casos);
}

function getCasosById(req, res){
    const {id} = req.params;
    const caso = casosRepository.findById(id);

    if (!caso){
        return res.status(404).json({message:`Caso não encontrado.`});
    }

    res.status(200).json(caso);
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


function atualizarCaso(req, res){
    const {id} = req.params;
    const novoCaso = req.body;

    const atualizado = casosRepository.update(id, novoCaso);

    if (!atualizado) {
        return res.status(404).json({message:`Caso não encontrado.`});
    }

    res.status(200).json(atualizado)
}


function atualizarParcialCaso(req, res){
    const {id} = req.params;
    const campos = req.body;

    const atualizado = casosRepository.update(id, campos);

    if (!atualizado) {
        return res.status(404).json({message:`Caso não encontrado.`});
    }

    res.status(200).json(atualizado)
}


function deletarCaso(req, res){
    const {id} = req.params;

    const removido = casosRepository.remove(id);

    if(!removido){
        return res.status(404).json({message:`Caso não encontrado.`});
    }

    res.status(204).send();
}



module.exports = {
    getCasos,
    getCasosById,
    createCaso,
    atualizarCaso,
    atualizarParcialCaso,
    deletarCaso,
};