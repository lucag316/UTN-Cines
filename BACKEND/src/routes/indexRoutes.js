
const express = require('express');
const router = express.Router();

const AllPeliRoutes = require("./AllPeliculasRoute")
const peliculaRoute = require("./PeliculaRoute")
const usuarioRoute = require("./UsuarioRoute")
const generosRoute = require("./AllGenerosRoute")
const repartoRoute = require("./AllRepartoRoute")

router.use('/AllPelis', AllPeliRoutes);
router.use("/pelicula",peliculaRoute)
router.use("/AllGeneros",generosRoute)
router.use("/AllReparto",repartoRoute)
router.use("/register",usuarioRoute)
router.use("/login",usuarioRoute)

module.exports = router;


