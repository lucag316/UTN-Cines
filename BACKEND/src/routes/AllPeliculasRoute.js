const express = require('express');
const router = express.Router();

const {getAllPeliController} = require("../controllers/AllPeliculasController")


router.get('/', getAllPeliController);







module.exports = router;
