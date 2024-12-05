const database = require('../database');


const getAllGenerosController = async(req,res)=>{
    let connection;
    try {
        connection = await database.getConnection();
    
        const query = `
            SELECT * FROM Genero
        `

        const resultado = await connection.query(query);
        res.send(resultado)
    } catch (error) {
        console.error("Error al obtener las generos:", error);
        res.status(500).send("Error al obtener las generos");
    }
}


module.exports = {
    getAllGenerosController
}