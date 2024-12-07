const express = require('express');
const router = express.Router();

const {getAllConsultasController,createConsultaController} = require("../controllers/ConsultaController.js")


router.get('/All', getAllConsultasController);
router.post('/', createConsultaController);







module.exports = router;
