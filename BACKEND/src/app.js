// REQUIRES
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const router = require("./routes/indexRoutes");
const bodyParser = require("body-parser");

// CONFIGURACION INICIAL
const app = express();


app.set("port", process.env.PORT || 5000); // poner PORT en mayuscula

app.use(bodyParser.json())

// MIDDLEWARES
app.use(cors({
    origin: ["http://localhost:52330", "http://localhost:5500","*"]
}));

app.use(morgan("dev"));


app.get("/",(req,res)=>{
    res.send("Bienvenido a utn-cines api")
})

// RUTAS
app.use("/", router);


module.exports = app;