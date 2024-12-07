const {getConnection} = require('../database');


const getAllRepartoController = async(req,res)=>{
    let connection;
    try {
        connection = await getConnection();
    
        const query = `
           SELECT 
                r.id_persona,
                CONCAT(r.nombre, ' ', r.apellido) AS nombre_completo,
                pr.rol
            FROM 
                Pelicula_Reparto pr
            INNER JOIN 
                Reparto r ON pr.id_persona = r.id_persona
        `

        const [rows] = await connection.query(query);
        res.send(rows)
    } catch (error) {
        console.error("Error al obtener las generos:", error);
        res.status(500).send("Error al obtener las generos");
    }
}


module.exports = {
    getAllRepartoController
}