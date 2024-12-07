
const express = require('express');
const router = express.Router();

const AllPeliRoutes = require("./AllPeliculasRoute")
const peliculaRoute = require("./PeliculaRoute")
const userRoute = require("./PeliculaRoute")
const generosRoute = require("./AllGenerosRoute")
const repartoRoute = require("./AllRepartoRoute")
const consultaRoute= require("./ConsultaRoute")

router.use('/AllPelis', AllPeliRoutes); //http://localhost:5000/AllPelis
router.use("/pelicula",peliculaRoute)
router.use("/user",userRoute)
router.use("/AllGeneros",generosRoute)
router.use("/AllReparto",repartoRoute)
router.use("/consulta",consultaRoute)


module.exports = router;


