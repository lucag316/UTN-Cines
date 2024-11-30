
const express = require('express');
const router = express.Router();

const AllPeliRoutes = require("./AllPeliculasRoute")
const peliculaRoute = require("./PeliculaRoute")
const userRoute = require("./PeliculaRoute")


router.use('/AllPelis', AllPeliRoutes);
router.use("/pelicula",peliculaRoute)
router.use("/user",userRoute)



module.exports = router;


