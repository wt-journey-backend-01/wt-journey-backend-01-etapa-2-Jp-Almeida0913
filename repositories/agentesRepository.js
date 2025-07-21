const {v4: uuidv4} = require(`uuid`);


const agentes = [
{
    "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
    "nome": "Rommel Carneiro",
    "dataDeIncorporacao": "1992/10/04",
    "cargo": "delegado(a)"
  },
  {
    "id": "d4e3fc4a-9c5b-4cbe-9cc6-ded6e75ac711",
    "nome": "Cláudia Tavares",
    "dataDeIncorporacao": "2001/06/12",
    "cargo": "investigador(a)"
  },
  {
    "id": "f7b9090f-25aa-47aa-a4f6-58f53fc09c3a",
    "nome": "Henrique Batista",
    "dataDeIncorporacao": "1998/03/22",
    "cargo": "agente especial"
  },
  {
    "id": "87d944c4-3bc5-4f66-b4f0-d187f56a6c20",
    "nome": "Larissa Cunha",
    "dataDeIncorporacao": "2010/11/08",
    "cargo": "delegado(a)"
  },
  {
    "id": "2e0ac303-7ee0-470e-98fb-c2901b839be7",
    "nome": "Douglas Farias",
    "dataDeIncorporacao": "2007/01/16",
    "cargo": "perito criminal"
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