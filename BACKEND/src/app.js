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
    origin: ["http://localhost:52330/", "http://127.0.0.1:5500/"], // Asegúrate de usar exactamente el origen desde donde haces la solicitud
    methods: ["GET", "POST", "PUT", "DELETE"], // Define métodos permitidos si es necesario
    credentials: true // Si necesitas enviar cookies u otras credenciales
}));

app.use(morgan("dev"));


app.get("/",(req,res)=>{
    res.send("Bienvenido a utn-cines api")
})

// RUTAS
app.use("/", router);


module.exports = app;