// index.js
const express = require('express');
const baseRoute = require('./base');
const carroRoute = require('./carro');
const endereco_lojaRoute = require('./endereco_loja');
const cadastro_clienteRoute = require('./cadastro_cliente');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

app.use('/', baseRoute);
app.use('/carros', carroRoute);
app.use('/endereco_lojas', endereco_lojaRoute);
app.use('/cadastro_clientes', cadastro_clienteRoute);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Iniciando servidor na porta ${port}`);
});