
const express = require('express');
const router = express.Router();

const AllPeliRoutes = require("./AllPeliculasRoute")
const peliculaRoute = require("./PeliculaRoute")
const usuarioRoute = require("./UsuarioRoute")
const generosRoute = require("./AllGenerosRoute")
const repartoRoute = require("./AllRepartoRoute")
const consultaRoute= require("./ConsultaRoute")

router.use('/AllPelis', AllPeliRoutes); //http://localhost:5000/AllPelis
router.use("/pelicula",peliculaRoute)
router.use("/AllGeneros",generosRoute)
router.use("/createUser",usuarioRoute)
router.use("/AllReparto",repartoRoute)
router.use("/consulta",consultaRoute)

router.use("/user",usuarioRoute)


module.exports = router;


