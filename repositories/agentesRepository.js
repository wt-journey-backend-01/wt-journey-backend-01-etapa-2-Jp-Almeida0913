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

function create(agente){
    const novoAgente = {id: uuidv4(), ...agente};
    agentes.push(novoAgente);
    return novoAgente;
}

module.exports = {
    findAll,
    create,
};
