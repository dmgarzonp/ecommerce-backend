'use strict'

const express = require('express');
const adminController = require('../controllers/AdminController');

const api = express.Router();

api.post('/registroAdmin', adminController.registroAdmin);
api.post('/loginAdmin', adminController.loginAdmin);

module.exports = api;