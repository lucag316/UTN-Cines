// REQUIRES
const express = require("express");
const morgan = require('morgan');
const database = require('./database');
const cors = require("cors");


// CONFIGURACION INICIAL
const app = express();

app.set("port", 6000);

app.listen(app.get("port"))
console.log("Escuchando comunicaciones al puerto " + app.get("port"));


// MIDDLEWARES
app.use(cors({
    origin: ["http://localhost:52330", "http://localhost:5500"]
}));

app.use(morgan("dev"));


// RUTAS
app.get("/bd_peliculas", async (req, res) => {
    const connection = await database.getConnection();
    const resultado = await connection.query(`
        SELECT 
        
    `);

    // Convierte las cadenas separadas por comas en arrays
    const recetas = resultado.map(receta => {
        return {
            ...receta,
            ingredientes: receta.ingredientes ? receta.ingredientes.split(', ') : [],
            elaboracion: receta.elaboracion ? receta.elaboracion.split(', ') : []
        };
    });

    console.log(recetas);
    res.json(recetas);
});