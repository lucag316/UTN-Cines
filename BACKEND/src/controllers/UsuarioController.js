const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require('../models/UsuarioModel');

// Validaciones
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 8;

const getUsuarioController = async (req, res) => { // login
    const { email, contraseña } = req.body;

    try {
        const usuario = await getUserByEmail(email);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta." });
        }

        res.json({ message: `Inicio de sesión exitoso. ¡Bienvenido, ${usuario.nombre}!` });
    } catch (err) {
        console.error("Error en el login:", err);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

const createUserController = async (req, res) => {
    const { nombre, email, contraseña, confirmar_contraseña } = req.body;

    try {
        // Verificamos si el usuario ya existe
        const usuarioExistente = await getUserByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: "El usuario ya está registrado." });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
        }

        if (!validatePassword(contraseña)) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
        }

        if (contraseña !== confirmar_contraseña) {
            return res.status(400).json({ error: "Las contraseñas no coinciden." });
        }
        
        const hash = await bcrypt.hash(contraseña, 10);

        // Creamos el usuario
        const userId = await createUser({ nombre, email, contraseña: hash });
        res.status(201).json({ message: "Usuario registrado con éxito." });
    } catch (err) {
        console.error("Error al registrar usuario:", err);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

module.exports = {
    getUsuarioController,
    createUserController
};


/*
const database = require('../database');


const getUsuario = async ()=>{ listo

}

const createUser = async ()=>{ listo
    
}

const actualizarUser = async ()=>{
    
}

const eliminarUsuario = async ()=>{
    
}


module.exports = {
    getUsuario,
    createUser,
    actualizarUser,
    eliminarUsuario
} */