// index.js
const express = require('express');
const baseRoute = require('./base');
const carroRoute = require('./carro');
const endereco_lojaRoute = require('./endereco_loja');
const clienteRoute = require('./cliente');
const vendaRoute = require('./venda')
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

app.use('/', baseRoute);
app.use('/carros', carroRoute);
app.use('/endereco_lojas', endereco_lojaRoute);
app.use('/clientes', clienteRoute);
app.use('/vendas', vendaRoute);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Iniciando servidor na porta ${port}`);
});