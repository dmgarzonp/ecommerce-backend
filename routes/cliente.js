'use strict'

const express = require('express');
const clienteController = require('../controllers/ClienteController');
const api = express.Router();
var auth = require('../middleware/authenticate')

api.post('/registroCliente', clienteController.registroCliente);
api.post('/loginCliente', clienteController.loginCliente);
api.get('/listarClientesFiltraAdmin/:tipo/:filtro?',auth.auth, clienteController.listarClientesFiltraAdmin);

module.exports = api;
