const {v4: uuidv4} = require(`uuid`);


const agentes = [
    {
        "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
        "nome": "Rommel Carneiro",
        "dataDeIncorporacao": "1992/10/04",
        "cargo": "delegado"
    }
];

function findAll(){
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(agente){
    const novoAgente = {id: uuidv4(), ...agente};
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, novosDados){
    const index = agentes.findIndex(agente =>agente.id === id);
    if (index === -1) return null;

    agentes[index] = {...agentes[index], ...novosDados};
    return agentes[index];
}

function remove(id){
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return null;

    const removido = agentes.splice(index, 1);
    return removido[0];
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
