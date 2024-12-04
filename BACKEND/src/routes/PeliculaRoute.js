const express = require('express');
const router = express.Router();

const {getPelicula,createPelicula,eliminarPelicula,actualizarPelicula,revivePeliculaController} = require("../controllers/PeliculaController")


router.get('/:id', getPelicula);
router.post("/",createPelicula)
router.put("/:id", actualizarPelicula)
router.put("/revive/:id",revivePeliculaController)
router.delete("/:id",eliminarPelicula)






module.exports = router;
