const express = require('express');
const router = express.Router();

const {getPelicula,createPelicula,eliminarPelicula,actualizarPelicula,revivePeliculaController} = require("../controllers/PeliculaController")


router.get('/:id', getPelicula);
router.post("/",createPelicula)
router.put("/:id")
router.delete("/:id",eliminarPelicula)
router.put("/:id",revivePeliculaController)






module.exports = router;
