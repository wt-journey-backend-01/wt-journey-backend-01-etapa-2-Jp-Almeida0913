const express = require(`express`);
const app = express();
const PORT = 3000;

const agentesRouter = require(`./routes/agentesRoutes`);
const casosRouter = require(`./routes/casosRoutes`);

app.use(express.json());

app.use(agentesRouter);
app.use(casosRouter);

app.listen(PORT, () =>{
    console.log(`Servidor do Departamento de Polícia rodande em localhost:${PORT}`);
})