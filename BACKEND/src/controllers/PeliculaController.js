const {getConnection} = require('../database');
const {getPeliculaById,
    insertGenero,
    insertPelicula,
    insertPeliculaReparto,
    insertReparto,
    deleteGenerosByPeliculaId,
    deleteRepartoByPeliculaId,
    insertGeneros,
    updatePelicula
} = require("../models/PeliculaModel");

const getPelicula = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que el ID sea un número válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }

        // Obtener la película desde el modelo
        const pelicula = await getPeliculaById(id);

        // Verificar si se encontró la película
        if (!pelicula) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Enviar la respuesta con los datos de la película
        res.status(200).json(pelicula);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Error fetching movie' });
    }
};

// Crear película
const createPelicula = async (req, res) => {
    let img_url = req.body.img_url;
    const {
        titulo,
        duracion,
        clasificacion,
        descripcion,
        anio,
        pais,
        trailer_url,
        rating,
        precio,
        generos,
        reparto
    } = req.body;

    const connection = await getConnection();

    try {
        await connection.beginTransaction();

        if(!esImagen(img_url)) img_url = "https://www.shutterstock.com/image-vector/image-not-found-failure-network-260nw-2330163829.jpg"

        // Insertar película
        const peliculaId = await insertPelicula([
            titulo, duracion, clasificacion, descripcion, anio, pais, img_url, trailer_url, rating, precio
        ]);

        // Insertar géneros
        for (const genero of generos) {
            await insertGenero(peliculaId, parseInt(genero.id));
        }

        // Insertar reparto
        for (const persona of reparto) {
            const personaId = await insertReparto(persona.nombre, persona.apellido);

            await insertPeliculaReparto(peliculaId, personaId, persona.rol);
        }

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
    const connection = await getConnection();
    let img_url = req.body.img_url;
    const {
        id_pelicula,
        titulo,
        duracion,
        clasificacion,
        descripcion,
        anio,
        pais,
        trailer_url,
        rating,
        precio,
        generos,
        reparto,
    } = req.body;

    console.log(req.body)
    try {
        await connection.beginTransaction();

        if(esImagen(img_url)) img_url = "https://www.shutterstock.com/image-vector/image-not-found-failure-network-260nw-2330163829.jpg"
        
        // Actualizar la película
        await updatePelicula([
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

        // Actualizar los géneros
        await deleteGenerosByPeliculaId(id_pelicula);
        await insertGeneros(id_pelicula, generos);

        // Actualizar el reparto
        await deleteRepartoByPeliculaId(id_pelicula);
        // Insertar reparto
        for (const persona of reparto) {
            const personaId = await insertReparto(persona.nombre, persona.apellido);
            await insertPeliculaReparto(parseInt(id_pelicula), personaId, persona.rol);
        }

        await connection.commit();
        res.status(200).send({ message: "Película actualizada exitosamente." });
    } catch (error) {
        await connection.rollback();
        console.error("Error al actualizar la película:", error);
        res.status(500).send({ error: "Error al actualizar la película." });
    } 
};


const eliminarPelicula = async (req,res)=>{
    let connection;
    try {
        const { id } = req.params;

        connection = await getConnection();

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

        connection = await getConnection();

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

function esImagen(url) {
    // Verifica que la URL termine con una extensión válida de imagen
    const extensionesValidas = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i; // Expresión regular para extensiones de imágenes
    return extensionesValidas.test(url);
}



module.exports = {
    getPelicula,
    createPelicula,
    actualizarPelicula,
    eliminarPelicula,
    revivePeliculaController
}