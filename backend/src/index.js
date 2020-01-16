//esse cara cuida das rotas da aplicacao
const express = require("express");
const mongoose = require("mongoose"); //banco de dados
const cors = require("cors");
const routes = require('./routes');

const app = express();

//MongoDb (otimo para aplicacoes que não vao precisar de tantos relacionamentos)
mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-aslcz.mongodb.net/week10?retryWrites=true&w=majority", {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

app.use(cors()); // vai liberar o acesso externo para qualquer tipo de aplicacao
//valido paratodas as request que vao receber json na request
app.use(express.json());
app.use(routes); //carregar as rotas feitas no outro arquivo

app.listen(3333); //qual porta ele vai usar