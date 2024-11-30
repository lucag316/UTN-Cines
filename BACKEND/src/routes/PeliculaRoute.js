const express = require('express');
const router = express.Router();

const {getPelicula,createPelicula,eliminarPelicula,actualizarPelicula} = require("../controllers/PeliculaController")


router.get('/', getPelicula);







module.exports = router;
