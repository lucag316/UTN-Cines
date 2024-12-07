const {getConnection} = require('../database');


const getAllGenerosController = async(req,res)=>{
    let connection;
    try {
        connection = await getConnection();
    
        const query = `
            SELECT * FROM Genero
        `

        const [rows] = await connection.query(query);
        res.send(rows)
    } catch (error) {
        console.error("Error al obtener las generos:", error);
        res.status(500).send("Error al obtener las generos");
    }
}


module.exports = {
    getAllGenerosController
}