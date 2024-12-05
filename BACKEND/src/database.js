
const mysql = require("promise-mysql");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();
// Determinar si estás en producción o en desarrollo
const isProduction = process.env.NODE_ENV === "production";

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
    host: isProduction ? "mysql.railway.internal" : process.env.DB_HOST,
    database: isProduction ? "railway" : process.env.DB_DATABASE,
    user: isProduction ? "root" : process.env.DB_USER,
    password: isProduction ? "ijqYizWvBwrBzYEfrcCJXZIENFVMyPox" : process.env.DB_PASSWORD,
    port: isProduction ? 3306 : process.env.DB_PORT || 3306
});

// Función para obtener la conexión
const getConnection = async () => await connection;

module.exports = {
    getConnection,
};
