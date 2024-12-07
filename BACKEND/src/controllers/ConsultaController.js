const {getConnection} = require('../database');


const getAllConsultasController = async(req,res)=>{
    let connection;
    try {
        connection = await getConnection();
    
        const query = `
           SELECT * FROM Consulta;
        `

        const [rows] = await connection.query(query);

        res.send(rows)
    } catch (error) {
        console.error("Error al obtener las consultas:", error);
        res.status(500).send("Error al obtener las consultas");
    }
}

const createConsultaController = async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        // Desestructuramos los datos recibidos en el cuerpo de la solicitud
        const { motivo, nombre, apellido, email, telefono, mensaje, preferencia_respuesta } = req.body;

        // Validación básica de los datos
        if (!motivo || !nombre || !apellido || !email || !telefono || !mensaje || !preferencia_respuesta) {
            return res.status(400).send("Todos los campos son obligatorios");
        }

        // Query para insertar los datos en la tabla Consulta
        const query = `
            INSERT INTO Consulta (motivo, nombre, apellido, email, telefono, mensaje, preferencia_respuesta)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        // Ejecutamos la consulta con los valores proporcionados
        const [result] = await connection.query(query, [
            motivo,
            nombre,
            apellido,
            email,
            telefono,
            mensaje,
            preferencia_respuesta,
        ]);

        // Enviamos la respuesta con el ID del nuevo registro
        res.status(201).send({
            message: "Consulta creada exitosamente",
            consultaId: result.insertId,
        });
    } catch (error) {
        console.error("Error al crear la consulta:", error);
        res.status(500).send("Error al crear la consulta");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};



module.exports = {
    getAllConsultasController,
    createConsultaController
}