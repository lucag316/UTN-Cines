const { getConnection } = require('../database');

const getUserByEmail = async (email) => {
    try {
        const conn = await getConnection();
        const query = "SELECT * FROM Usuario WHERE email = ?";
        const rows = await conn.query(query, [email]);
        return rows.length > 0 ? rows[0] : null; // Devuelve el usuario si existe
    } catch (err) {
        console.error("Error en getUserByEmail:", err);
        throw new Error("Error al buscar el usuario en la base de datos.");
    }
};

const createUser = async ({ nombre, email, contraseña }) => {
    try {
        const conn = await getConnection();
        const query = "INSERT INTO Usuario (nombre, email, contraseña) VALUES (?, ?, ?)";
        const result = await conn.query(query, [nombre, email, contraseña]);
        return result?.insertId || null;  // Devuelve el ID del nuevo usuario
    } catch (err) {
        console.error("Error en createUser:", err);
        throw new Error("Error al crear el usuario en la base de datos.");
    }
};

module.exports = {
    getUserByEmail,
    createUser
}