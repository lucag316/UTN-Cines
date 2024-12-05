const {getConnection,pool} = require('../database');

const getPeliculaById = async (id) => {

    const connection = await getConnection();

    // Obtener los datos principales de la película
    const [pelicula] = await connection.query(
        'SELECT * FROM Pelicula WHERE id_pelicula = ?',
        [id]
    );

    // Verificar si la película existe
    if (pelicula.length === 0) {
        return null;
    }

    // Obtener los géneros asociados
    const [generos] = await connection.query(
        `SELECT g.id_genero, g.nombre 
         FROM Genero g 
         INNER JOIN Pelicula_Genero pg ON g.id_genero = pg.id_genero 
         WHERE pg.id_pelicula = ?`,
        [id]
    );

    // Obtener el reparto asociado
    const [reparto] = await connection.query(
        `SELECT r.id_persona, r.nombre, r.apellido, pr.rol
         FROM Reparto r 
         INNER JOIN Pelicula_Reparto pr ON r.id_persona = pr.id_persona 
         WHERE pr.id_pelicula = ?`,
        [id]
    );

    return {
        ...pelicula[0],  // Los datos principales de la película
        generos: generos.length > 0 ? generos : [], // Lista de géneros
        reparto: reparto.length > 0 ? reparto : []  // Lista de reparto
    };
};


const insertPelicula = async (peliculaData) => {
    const query = `
        INSERT INTO Pelicula 
        (titulo, duracion, clasificacion, descripcion, anio, pais, img_url, trailer_url, rating, precio) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, peliculaData);
    return result.insertId;
};

const insertGenero = async (peliculaId, generoId) => {
    const query = `
        INSERT INTO Pelicula_Genero (id_pelicula, id_genero) 
        VALUES (?, ?)
    `;
    await pool.query(query, [peliculaId, generoId]);
};

const insertReparto = async (nombre, apellido) => {
    const query = `
        INSERT IGNORE INTO Reparto (nombre, apellido) 
        VALUES (?, ?)
    `;
    const [result] = await pool.query(query, [nombre, apellido]);
    return result.insertId;
};


const insertPeliculaReparto = async (peliculaId, personaId, rol) => {
    const query = `
        INSERT INTO Pelicula_Reparto (id_pelicula, id_persona, rol) 
        VALUES (?, ?, ?)
    `;
    await pool.query(query, [peliculaId, personaId, rol]);
};


const updatePelicula = async (peliculaData) => {
    const query = `
        UPDATE Pelicula
        SET 
            titulo = ?, 
            duracion = ?, 
            clasificacion = ?, 
            descripcion = ?, 
            anio = ?, 
            pais = ?, 
            img_url = ?, 
            trailer_url = ?, 
            rating = ?, 
            precio = ?, 
            fecha_modificacion = NOW()
        WHERE id_pelicula = ?
    `;
    await pool.query(query, peliculaData);
};

const deleteGenerosByPeliculaId = async (peliculaId) => {
    const query = `DELETE FROM Pelicula_Genero WHERE id_pelicula = ?`;
    await pool.query(query, [peliculaId]);
};

const insertGeneros = async (peliculaId, generos) => {
    const query = `INSERT INTO Pelicula_Genero (id_pelicula, id_genero) VALUES (?, ?)`;
    for (const genero of generos) {
        await pool.query(query, [peliculaId, genero.id]);
    }
};

const deleteRepartoByPeliculaId = async (peliculaId) => {
    const query = `DELETE FROM Pelicula_Reparto WHERE id_pelicula = ?`;
    await pool.query(query, [peliculaId]);
};





module.exports = { 
    getPeliculaById,
    insertPelicula,
    insertGenero,
    insertReparto,
    insertPeliculaReparto,
    updatePelicula,
    deleteGenerosByPeliculaId,
    insertGeneros,
    deleteRepartoByPeliculaId,
    insertReparto,
};
