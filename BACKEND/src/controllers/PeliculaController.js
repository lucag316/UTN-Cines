const database = require('../database');


const getPelicula = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        connection = await database.getConnection();

        // Validar que el ID sea un número válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }

        // Consultar los datos de la película
        const pelicula = await connection.query(
            'SELECT * FROM Pelicula WHERE id_pelicula = ?',
            [id]
        );

        // Verificar si se encontró la película
        if (pelicula.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Consultar los géneros asociados
        const generos = await connection.query(
            `SELECT g.id_genero, g.nombre 
             FROM Genero g 
             INNER JOIN Pelicula_Genero pg ON g.id_genero = pg.id_genero 
             WHERE pg.id_pelicula = ?`,
            [id]
        );

        // Consultar el reparto asociado
        const reparto = await connection.query(
            `SELECT r.id_persona, r.nombre, r.apellido, pr.rol, pr.personaje 
             FROM Reparto r 
             INNER JOIN Pelicula_Reparto pr ON r.id_persona = pr.id_persona 
             WHERE pr.id_pelicula = ?`,
            [id]
        );

        // Construir la respuesta
        const response = {
            ...pelicula[0], // Incluye los datos principales de la película
            generos: generos.length > 0 ? generos : [], // Lista de géneros, o un arreglo vacío si no hay
            reparto: reparto.length > 0 ? reparto : []  // Lista de reparto, o un arreglo vacío si no hay
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Error fetching movie' });
    }
};

// Crear película
const createPelicula = async (req, res) => {
    const {
        titulo,
        duracion,
        clasificacion,
        descripcion,
        anio,
        pais,
        img_url,
        trailer_url,
        rating,
        precio,
        generos,
        reparto
    } = req.body;

    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        // Insertar película
        const result = await connection.query(
            `INSERT INTO Pelicula 
            (titulo, duracion, clasificacion, descripcion, anio, pais, img_url, trailer_url, rating, precio) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, duracion, clasificacion, descripcion, anio, pais, img_url, trailer_url, rating, precio]
        );

        const peliculaId = result.insertId;

        // Insertar géneros
        for (const genero of generos) {
            await connection.query(
                `INSERT INTO Pelicula_Genero (id_pelicula, id_genero) 
                VALUES (?, ?)`,
                [parseInt(peliculaId), parseInt(genero.id)]
            );
        }

        // Insertar reparto
        for (const persona of reparto) {
            const resultPersona = await connection.query(
                `INSERT IGNORE INTO Reparto (nombre, apellido) 
                VALUES (?, ?)`,
                [persona.nombre, persona.nombre.split(' ').slice(1).join(' ')]
            );

            const personaId = resultPersona.insertId;

            await connection.query(
                `INSERT INTO Pelicula_Reparto (id_pelicula, id_persona, rol) 
                VALUES (?, ?, ?)`,
                [parseInt(peliculaId), parseInt(personaId), persona.rol]
            );
        }

        // Confirmar transacción
        await connection.commit();

        res.status(201).json({ message: 'Movie created successfully', id: peliculaId });
    } catch (error) {
        // Revertir transacción si hay error
        await connection.rollback();
        console.error('Error creating movie:', error);
        res.status(500).json({ message: 'Error creating movie' });
    } 
};

const actualizarPelicula = async (req, res) => {
    const connection = await database.getConnection();
    const {
        id_pelicula,
        titulo,
        duracion,
        clasificacion,
        descripcion,
        anio,
        pais,
        img_url,
        trailer_url,
        rating,
        precio,
        generos,
        reparto,
    } = req.body;

    console.log(req.body)

    try {
        // Inicia una transacción
        await connection.beginTransaction();

        // Actualizar la tabla principal de películas
        const updateMovieQuery = `
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
        await connection.query(updateMovieQuery, [
            titulo,
            duracion,
            clasificacion,
            descripcion,
            parseInt(anio),
            pais,
            img_url,
            trailer_url,
            rating,
            parseInt(precio),
            parseInt(id_pelicula),
        ]);

        // Actualizar los géneros asociados
        const deleteGenresQuery = `DELETE FROM Pelicula_Genero WHERE id_pelicula = ?`;
        await connection.query(deleteGenresQuery, [id_pelicula]);

        const insertGenresQuery = `
            INSERT INTO Pelicula_Genero (id_pelicula, id_genero)
            VALUES (?, ?)
        `;
        for (const genero of generos) {
            await connection.query(insertGenresQuery, [parseInt(id_pelicula), parseInt(genero.id)]);
        }

        // Actualizar el reparto asociado
        const deleteRepartoQuery = `DELETE FROM Pelicula_Reparto WHERE id_pelicula = ?`;
        await connection.query(deleteRepartoQuery, [parseInt(id_pelicula)]);

        const insertRepartoQuery = `
            INSERT INTO Pelicula_Reparto (id_pelicula, id_persona, rol)
            VALUES (?, ?, ?)
        `;
        for (const persona of reparto) {
            await connection.query(insertRepartoQuery, [parseInt(id_pelicula), persona.id, persona.rol]);
        }

        // Confirmar la transacción
        await connection.commit();
        res.status(200).send({ message: "Película actualizada exitosamente." });

        
    } catch (error) {
        // Deshacer la transacción en caso de error
        await connection.rollback();
        console.error("Error al actualizar la película:", error);
        res.status(500).send({ error: "Error al actualizar la película." });
    } 
};


const eliminarPelicula = async (req,res)=>{
    let connection;
    try {
        const { id } = req.params;

        connection = await database.getConnection();

        // Validar que el ID sea un número válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }

        // Actualizar el campo eliminado a TRUE
        const result = await connection.query(
            'UPDATE Pelicula SET eliminado = TRUE WHERE id_pelicula = ?',
            [id]
        );

        // Verificar si se afectó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie not found or already deleted' });
        }

        res.status(200).json({ message: 'Movie successfully deleted (soft delete)' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Error deleting movie' });
    } 
}

const revivePeliculaController = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;

        // Validar que el ID sea válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }

        connection = await database.getConnection();

        // Actualizar el campo eliminado a false
        const result = await connection.query(
            'UPDATE Pelicula SET eliminado = FALSE WHERE id_pelicula = ?',
            [id]
        );

        // Verificar si se afectó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie not found or already active' });
        }

        res.status(200).json({ message: 'Movie revived successfully' });
    } catch (error) {
        console.error('Error reviving movie:', error);
        res.status(500).json({ message: 'Error reviving movie' });
    } 
};




module.exports = {
    getPelicula,
    createPelicula,
    actualizarPelicula,
    eliminarPelicula,
    revivePeliculaController
}