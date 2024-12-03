const express = require('express');
const router = express.Router();

const {getPelicula,createPelicula,eliminarPelicula,actualizarPelicula} = require("../controllers/PeliculaController")


router.get('/:id', getPelicula);
router.post("/")
router.put("/:id")
router.delete("/:id",eliminarPelicula)






module.exports = router;
