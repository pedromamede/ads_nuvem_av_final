// api.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); 


const router = express.Router();
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }))

const APP_ID = process.env['APP_ID'];
const API_KEY = process.env['API_KEY'];
const nomeCrud = 'endereco_loja'
const nomeCrudPlural = 'endereco_lojas'
const BASE_URL = `https://parseapi.back4app.com/classes/${nomeCrudPlural}`;

// Define your CRUD routes here
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.render(`index_${nomeCrud}`, { objetos: response.data.results, nomeCrud: nomeCrud, nomeCrudPlural: nomeCrudPlural });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/new', async (req, res) => {
  try {
    res.render(`new_${nomeCrud}`, {nomeCrud: nomeCrud, nomeCrudPlural: nomeCrudPlural});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    const objeto = response.data;
    res.render(`edit_${nomeCrud}`, {objeto: objeto, nomeCrud: nomeCrud, nomeCrudPlural: nomeCrudPlural});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}`, req.body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.redirect(`/${nomeCrudPlural}/`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar');
  }
});

router.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, req.body, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    res.redirect(`/${nomeCrudPlural}/${id}/`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${req.body.id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    res.redirect(`/${nomeCrudPlural}/`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir');
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-REST-API-Key': API_KEY
      }
    });
    const objeto = response.data;
    res.render(`show_${nomeCrud}`, { objeto: objeto, nomeCrud: nomeCrud, nomeCrudPlural: nomeCrudPlural });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;