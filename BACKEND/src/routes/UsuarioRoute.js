const express = require('express');
const { createUserController, getUsuarioController } = require('../controllers/UsuarioController');
const router = express.Router();

router.post('/login', getUsuarioController); // modificado
router.post('/register', createUserController);


module.exports = router;

// usar peliculaRoute como referencia.