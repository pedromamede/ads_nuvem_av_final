// index.js
const express = require('express');
const baseRoute = require('./base');
const carroRoute = require('./carro');
const endereco_lojaRoute = require('./endereco_loja');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

app.use('/', baseRoute);
app.use('/carros', carroRoute);
app.use('/endereco_loja', endereco_lojaRoute);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Iniciando servidor na porta ${port}`);
});