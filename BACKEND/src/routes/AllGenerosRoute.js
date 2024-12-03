const express = require('express');
const router = express.Router();

const {getAllGenerosController} = require("../controllers/AllGenerosController.js")


router.get('/', getAllGenerosController);







module.exports = router;
