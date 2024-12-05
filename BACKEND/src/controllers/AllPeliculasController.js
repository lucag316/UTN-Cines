const database = require('../database');



const getAllPeliController = async (req, res) => {
    let connection;
    try {
        connection = await database.getConnection();

        
        const query = `
                SELECT 
                    p.id_pelicula AS id,
                    p.titulo,
                    p.img_url AS portada,
                    p.trailer_url AS trailer,
                    p.duracion,
                    p.descripcion AS sinopsis,
                    p.anio AS año,
                    p.pais,
                    p.rating,
                    p.eliminado,
                    p.precio,
                    p.fecha_creacion,
                    p.fecha_modificacion,
                    p.clasificacion,
                    -- Array de géneros asociados a la película
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', g.id_genero,
                                    'nombre', g.nombre
                                )
                            )
                        FROM 
                            Pelicula_Genero pg
                        LEFT JOIN 
                            Genero g ON pg.id_genero = g.id_genero
                        WHERE 
                            pg.id_pelicula = p.id_pelicula
                    ) AS generos,
                    -- Director (sólo uno)
                    (
                        SELECT 
                            JSON_OBJECT(
                                'id', r.id_persona,
                                'nombre', r.nombre,
                                'apellido', r.apellido
                            )
                        FROM 
                            Pelicula_Reparto pr
                        LEFT JOIN 
                            Reparto r ON pr.id_persona = r.id_persona
                        WHERE 
                            pr.id_pelicula = p.id_pelicula AND pr.rol = 'Director'
                        LIMIT 1
                    ) AS director,
                    -- Reparto completo como array de objetos
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', r.id_persona,
                                    'nombre', r.nombre,
                                    'apellido', r.apellido,
                                    'rol', pr.rol
                                )
                            )
                        FROM 
                            Pelicula_Reparto pr
                        LEFT JOIN 
                            Reparto r ON pr.id_persona = r.id_persona
                        WHERE 
                            pr.id_pelicula = p.id_pelicula
                    ) AS reparto
                FROM 
                    Pelicula p
                WHERE 
                    p.eliminado = 0
                GROUP BY 
                    p.id_pelicula;
                `;

        const [rows] = await connection.query(query);

         // Parsear manualmente las columnas JSON
        //  const peliculas = rows.map(pelicula => ({
        //     ...pelicula,
        //     generos: pelicula.generos ? JSON.parse(pelicula.generos) : [],
        //     director: pelicula.director ? JSON.parse(pelicula.director) : null,
        //     reparto: pelicula.reparto ? JSON.parse(pelicula.reparto) : []
        // }));

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).send("Error al obtener las películas");
    }
    

}

const getAllPeliAdminController = async (req,res)=>{
    let connection;
    try {
        
        
        connection = await database.getConnection();

        const query = `
                SELECT 
                    p.id_pelicula AS id,
                    p.titulo,
                    p.img_url AS portada,
                    p.trailer_url AS trailer,
                    p.duracion,
                    p.descripcion AS sinopsis,
                    p.anio AS año,
                    p.pais,
                    p.rating,
                    p.eliminado,
                    p.precio,
                    p.fecha_creacion,
                    p.fecha_modificacion,
                    p.clasificacion,
                    -- Array de géneros asociados a la película
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', g.id_genero,
                                    'nombre', g.nombre
                                )
                            )
                        FROM 
                            Pelicula_Genero pg
                        LEFT JOIN 
                            Genero g ON pg.id_genero = g.id_genero
                        WHERE 
                            pg.id_pelicula = p.id_pelicula
                    ) AS generos,
                    -- Director (sólo uno)
                    (
                        SELECT 
                            JSON_OBJECT(
                                'id', r.id_persona,
                                'nombre', r.nombre,
                                'apellido', r.apellido
                            )
                        FROM 
                            Pelicula_Reparto pr
                        LEFT JOIN 
                            Reparto r ON pr.id_persona = r.id_persona
                        WHERE 
                            pr.id_pelicula = p.id_pelicula AND pr.rol = 'Director'
                        LIMIT 1
                    ) AS director,
                    -- Reparto completo como array de objetos
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', r.id_persona,
                                    'nombre', r.nombre,
                                    'apellido', r.apellido,
                                    'rol', pr.rol
                                )
                            )
                        FROM 
                            Pelicula_Reparto pr
                        LEFT JOIN 
                            Reparto r ON pr.id_persona = r.id_persona
                        WHERE 
                            pr.id_pelicula = p.id_pelicula
                    ) AS reparto
                FROM 
                    Pelicula p
                GROUP BY 
                    p.id_pelicula;
                `;

        const [rows] = await connection.query(query);

        //  // Parsear manualmente las columnas JSON
        //  const peliculas = resultado.map(pelicula => ({
        //     ...pelicula,
        //     generos: pelicula.generos ? JSON.parse(pelicula.generos) : [],
        //     director: pelicula.director ? JSON.parse(pelicula.director) : null,
        //     reparto: pelicula.reparto ? JSON.parse(pelicula.reparto) : []
        // }));

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).send("Error al obtener las películas");
    }
}


module.exports = {
    getAllPeliController,
    getAllPeliAdminController
}


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
        WHERE 
            pr.id_pelicula = p.id_pelicula 
        LIMIT 1
    ) AS director,
    (
        SELECT 
            GROUP_CONCAT(DISTINCT CONCAT(a.nombre, ' ', a.apellido) ORDER BY a.id_persona SEPARATOR ', ')
        FROM 
            Pelicula_Reparto pr
        LEFT JOIN 
            Reparto a ON pr.id_persona = a.id_persona
        WHERE 
            pr.id_pelicula = p.id_pelicula 
    ) AS reparto
FROM 
    Pelicula p
GROUP BY 
    p.id_pelicula;
            `;