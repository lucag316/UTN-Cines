const mysql = require('mysql2/promise');
const mysql2 = require("promise-mysql");
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Determinar si estás en producción o en desarrollo
const isProduction = process.env.NODE_ENV === "production";


// Crear la configuración de conexión
const pool = mysql.createPool({
    database: isProduction ? process.env.MYSQL_DATABASE : process.env.DB_DATABASE,
    user: isProduction ? process.env.MYSQL_USER : process.env.DB_USER,
    password: isProduction ? process.env.MYSQL_PASSWORD : process.env.DB_PASSWORD,
    port: isProduction ? process.env.MYSQL_PORT : process.env.DB_PORT || 3306,
    host: isProduction ? process.env.MYSQL_HOST : process.env.DB_HOST,
    waitForConnections: true,
    connectionLimit: 50, // Número máximo de conexiones simultáneas
    queueLimit: 0, // Sin límite de conexiones en cola
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.MYSQL_PASSWORD)
    }
});

// Función para obtener una conexión del pool
const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        return connection;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        throw error;
    }
};

module.exports = {
    getConnection,
    pool, // Exportamos el pool por si es necesario en otro lugar
};

// const mysql = require("promise-mysql");
// const dotenv = require("dotenv");

// // Cargar variables de entorno
// dotenv.config();

// process.env.NODE_ENV = "production"

// // Determinar si estás en producción o en desarrollo
// const isProduction = process.env.NODE_ENV === "production";

// // Configuración de conexión a la base de datos
// const connection = mysql.createConnection({
//     database: isProduction ? process.env.MYSQL_DATABASE : process.env.DB_DATABASE,
//     user: isProduction ? process.env.MYSQL_USER : process.env.DB_USER,
//     password: isProduction ? process.env.MYSQL_PASSWORD : process.env.DB_PASSWORD,
//     port: isProduction ? process.env.MYSQL_PORT : process.env.DB_PORT || 3306,
//     host: isProduction ? process.env.MYSQL_HOST : process.env.DB_HOST,
//     connectTimeout:10000

// });

// // Función para obtener la conexión
// const getConnection = async () => await connection;

// module.exports = {
//     getConnection,
// };
