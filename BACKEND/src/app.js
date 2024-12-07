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
    origin: [
        "http://localhost:52330", // Sin la barra al final
        "http://localhost:3000", // Sin la barra al final
        "http://127.0.0.1:5500", // Sin la barra al final
        "http://127.0.0.1:3000",
        "http://localhost:3000",  // flor
        "https://utn-cines.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.options("*", cors());

app.use(morgan("dev"));


app.get("/",(req,res)=>{
    res.send("Bienvenido a utn-cines api")
})
//http://localhost:5000/


// RUTAS
app.use("/", router);

//

module.exports = app;