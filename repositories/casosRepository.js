const {v4: uuidv4} = require(`uuid`)

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    
    },
]

function findAll(){
    return casos;
}

function findById(id){
    return casos.find(casos => casos.id === id);
}

function create(caso){
    const novoCaso = {id: uuidv4(), ...caso};
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, novosDados){
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;

    casos[index] = {...casos[index], ...novosDados};
    return casos[index];
}

function remove(id){
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;

    const removido = casos.splice(index, 1);
    return removido[0];
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};