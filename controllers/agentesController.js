const agentesRepository = require(`../repositories/agentesRepository`);
const mensagemErro = `Campo Obrigatório!`;



function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll();
    res.json(agentes);
};


function getAgenteById(req, res){
    const {id} = req.params;
    const agente = agentesRepository.findById(id);


    if (!agente){
        return res.status(404).json({message:`Agente não encontrado.`});
    }

    res.status(200).json(agente);
}


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


function atualizarAgente(req, res){
    const {id} = req.params;
    const novoAgente = req.body;

    const atualizado = agentesRepository.update(id, novoAgente);

    if (!atualizado){
        return res.status(404).json({message:`Agente não encontrado`});
    }

    res.status(200).json(atualizado);
}


function atualizarParcialAgente(req, res){
    const {id} = req.params;
    const campos = req.body;

    const atualizado = agentesRepository.update(id, campos);
    
    if (!atualizado){
        return res.status(404).json({message:`Agente não encontrado.`});
    }

    res.status(200).json(atualizado);
}


function deletarAgente(req, res){
    const {id} = req.params;

    const removido = agentesRepository.remove(id);

    if(!removido){
        return res.status(404).json({message:`Agente não encontrado.`});
    }

    res.status(204).send();
}



module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    atualizarAgente,
    atualizarParcialAgente,
    deletarAgente,
};