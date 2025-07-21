const express = require(`express`);
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const PORT = 3000;

const agentesRouter = require(`./routes/agentesRoutes`);
const casosRouter = require(`./routes/casosRoutes`);

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(agentesRouter);
app.use(casosRouter);

app.listen(PORT, () =>{
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
})