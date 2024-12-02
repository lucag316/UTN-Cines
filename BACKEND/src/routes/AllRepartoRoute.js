const express = require('express');
const router = express.Router();

const {getAllRepartoController} = require("../controllers/AllRepartoController.js")


router.get('/', getAllRepartoController);







module.exports = router;
