
const mysql = require("promise-mysql");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

process.env.NODE_ENV= "production"
// Determinar si estás en producción o en desarrollo
const isProduction = process.env.NODE_ENV === "production";

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
    host: isProduction ? process.env.MYSQL_HOST : process.env.DB_HOST,
    database: isProduction ? process.env.MYSQL_DATABASE : process.env.DB_DATABASE,
    user: isProduction ? process.env.MYSQL_USER : process.env.DB_USER,
    password: isProduction ? process.env.MYSQL_PASSWORD : process.env.DB_PASSWORD,
    port: isProduction ? process.env.MYSQL_PORT : process.env.DB_PORT || 3306
});

// Función para obtener la conexión
const getConnection = async () => await connection;

module.exports = {
    getConnection,
};
