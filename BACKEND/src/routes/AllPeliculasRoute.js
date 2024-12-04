const express = require('express');
const router = express.Router();

const {getAllPeliController,
    getAllPeliAdminController
} = require("../controllers/AllPeliculasController")


router.get('/', getAllPeliController); //http://localhost:5000/AllPelis
router.get("/admin",getAllPeliAdminController)






module.exports = router;
