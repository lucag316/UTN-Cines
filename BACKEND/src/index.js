// REQUIRES
const express = require("express");
const morgan = require('morgan');
const database = require('./database');
const cors = require("cors");


// CONFIGURACION INICIAL
const app = express();

app.set("port", 8080);

app.listen(app.get("port"))
console.log("Escuchando comunicaciones al puerto " + app.get("port"));


// MIDDLEWARES
app.use(cors({
    origin: ["http://localhost:52330", "http://localhost:5500"]
}));

app.use(morgan("dev"));


// RUTAS
app.get("/api_utn_peliculas", async (req, res) => {
    try {
        const connection = await database.getConnection();

        const query = `
            SELECT 
                p.id,
                p.titulo,
                p.portada,
                p.trailer,
                p.duracion,
                p.sinopsis,
                p.año,
                c.nombre AS clasificacion, -- Cambiado a c.nombre
                g.nombre AS genero,
                CONCAT(d.nombre, ' ', d.apellido) AS director,
                GROUP_CONCAT(DISTINCT CONCAT(a.nombre, ' ', a.apellido) ORDER BY a.id SEPARATOR ', ') AS reparto
            FROM Peliculas p
            LEFT JOIN Clasificaciones c ON p.id_clasificacion = c.id
            LEFT JOIN Generos g ON p.id_genero = g.id
            LEFT JOIN Directores d ON p.id_director = d.id
            LEFT JOIN Peliculas_Actores pa ON p.id = pa.id_pelicula
            LEFT JOIN Actores a ON pa.id_actor = a.id
            GROUP BY 
                p.id, c.nombre, g.nombre, d.nombre, d.apellido; -- Cambiado a c.nombre
        `;

        const resultado = await connection.query(query);

        // Convertimos los datos del reparto en un array
        const peliculas = resultado.map(pelicula => {
            return {
                ...pelicula,
                reparto: pelicula.reparto ? pelicula.reparto.split(", ") : []
            };
        });

        res.json(peliculas);
        console.log(peliculas);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).send("Error al obtener las películas");
    }
});