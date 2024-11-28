// REQUIRES
const express = require("express");
const morgan = require('morgan');
const database = require('./database');
const cors = require("cors");


// CONFIGURACION INICIAL
const app = express();

app.set("port", 8080); // poner PORT en mayuscula

app.listen(app.get("port"))
console.log("Escuchando comunicaciones al puerto " + app.get("port")); // usar bactics en vez de comillas


// MIDDLEWARES
app.use(cors({
    origin: ["http://localhost:52330", "http://localhost:5500"]
}));

app.use(morgan("dev"));


// RUTAS
app.get("/db_utn_cines", async (req, res) => {
    try {
        const connection = await database.getConnection();

        const query = `
            SELECT 
    p.id_pelicula AS id,
    p.titulo,
    p.img_url AS portada,
    p.trailer_url AS trailer,
    p.duracion,
    p.descripcion AS sinopsis,
    YEAR(p.anio) AS año,
    p.pais,
    p.rating,
    p.fecha_creacion,
    p.fecha_modificacion,
    p.clasificacion,
    (
        SELECT 
            GROUP_CONCAT(DISTINCT g.nombre ORDER BY g.nombre SEPARATOR ', ')
        FROM 
            Pelicula_Genero pg
        LEFT JOIN 
            Genero g ON pg.id_genero = g.id_genero
        WHERE 
            pg.id_pelicula = p.id_pelicula
    ) AS generos,
    (
        SELECT 
            CONCAT(d.nombre, ' ', d.apellido)
        FROM 
            Pelicula_Reparto pr
        LEFT JOIN 
            Reparto d ON pr.id_persona = d.id_persona
        LEFT JOIN 
            Rol r ON pr.id_rol = r.id_rol
        WHERE 
            pr.id_pelicula = p.id_pelicula AND r.nombre = 'Director'
        LIMIT 1
    ) AS director,
    (
        SELECT 
            GROUP_CONCAT(DISTINCT CONCAT(a.nombre, ' ', a.apellido) ORDER BY a.id_persona SEPARATOR ', ')
        FROM 
            Pelicula_Reparto pr
        LEFT JOIN 
            Reparto a ON pr.id_persona = a.id_persona
        LEFT JOIN 
            Rol r ON pr.id_rol = r.id_rol
        WHERE 
            pr.id_pelicula = p.id_pelicula AND r.nombre != 'Director'
    ) AS reparto
FROM 
    Pelicula p
GROUP BY 
    p.id_pelicula;
            `;

        const resultado = await connection.query(query);

        // Convert the cast data into an array
        const peliculas = resultado.map(pelicula => {
            return {
                ...pelicula,
                generos: pelicula.generos ? pelicula.generos.split(", ") : [],
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