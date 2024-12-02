
const express = require('express');
const router = express.Router();

const AllPeliRoutes = require("./AllPeliculasRoute")
const peliculaRoute = require("./PeliculaRoute")
const userRoute = require("./PeliculaRoute")
const generosRoute = require("./AllGenerosRoute")
const repartoRoute = require("./AllRepartoRoute")

router.use('/AllPelis', AllPeliRoutes);
router.use("/pelicula",peliculaRoute)
router.use("/user",userRoute)
router.use("/AllGeneros",generosRoute)
router.use("/AllReparto",repartoRoute)

module.exports = router;


