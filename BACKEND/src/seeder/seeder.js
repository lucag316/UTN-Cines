 
const generoEndPointAPI = "https://api.themoviedb.org/3/genre/tv/list?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES"
const pelisEndPointAPI = "https://api.themoviedb.org/3/movie/popular?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES&page=1"


const fs = require('fs');
const path = require('path');
// seedDatabase.js
const database = require('../database');
const data = require('./datos.json'); // Archivo JSON con los datos

const seedDatabase = async () => {
  let connection;
  try {
    connection = await database.getConnection();
    // Insertar géneros
    for (const genero of data.generos) {
      const query = `INSERT IGNORE INTO Genero (id_genero, nombre) VALUES (?, ?)`;
      await connection.query(query, [genero.id, genero.name]);
    }

    // Insertar personas en el reparto
    for (const persona of data.reparto) {
      const nombreCompleto = persona.nombre || persona.name; // Para manejar las diferencias de nombres
      const apellido = persona.nombre.split(" ")[1]; // El JSON no incluye apellido, por lo que se deja vacío
      const query = `INSERT IGNORE INTO Reparto (id_persona, nombre, apellido) VALUES (?, ?, ?)`;
      await connection.query(query, [persona.id, nombreCompleto, apellido]);
    }

    // Insertar películas
    for (const pelicula of data.peliculas) {
      const queryPelicula = `
        INSERT IGNORE INTO Pelicula (
          id_pelicula, titulo, duracion, clasificacion, descripcion, anio, pais,
          img_url, trailer_url, rating, precio, fecha_creacion, fecha_modificacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      await connection.query(queryPelicula, [
        pelicula.id,
        pelicula.titulo,
        pelicula.duracion,
        pelicula.clasificacion,
        pelicula.descripcion,
        pelicula.anio,
        pelicula.pais,
        pelicula.img_url,
        pelicula.trailer_url,
        pelicula.rating,
        pelicula.precio,
        pelicula.eliminado
      ]);

      // Relacionar géneros con la película
      for (const genero of pelicula.generos) {
        const queryGenero = `INSERT IGNORE INTO Pelicula_Genero (id_pelicula, id_genero) VALUES (?, ?)`;
        await connection.query(queryGenero, [pelicula.id, genero.id]);
      }

      // Relacionar reparto con la película y el rol
      for (const miembro of pelicula.reparto) {
        // Verificar que el rol sea válido (uno de 'Actor', 'Director' o 'Actriz')
        const validRoles = ['actor', 'Director', 'Actriz'];
        if (validRoles.includes(miembro.rol)) {
          const queryReparto = `
            INSERT IGNORE INTO Pelicula_Reparto (id_pelicula, id_persona, rol, personaje)
            VALUES (?, ?, ?, ?)
          `;
          await connection.query(queryReparto, [
            pelicula.id,
            miembro.id,
            miembro.rol, // Asignar el rol directamente
            miembro.personaje || '', // Asignar personaje si está disponible
          ]);
        }
      }
      
    }

    console.log('Base de datos poblada exitosamente');
  } catch (error) {
    console.error('Error al poblar la base de datos:\n', error);
  }finally{
    connection.end();
  }
};


const createTables = async () => {
  let connection;
  try {
    connection = await database.getConnection();
    // // Leer el archivo create.sql
    // const sqlScriptPath = path.join(__dirname, '../config/create.sql');
    // const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');
    await connection.query('CREATE TABLE Pelicula (id_pelicula INT PRIMARY KEY AUTO_INCREMENT, titulo VARCHAR(200) NOT NULL, duracion INT NOT NULL, clasificacion VARCHAR(20), descripcion TEXT, anio YEAR NOT NULL, pais VARCHAR(50), img_url VARCHAR(100), trailer_url VARCHAR(100), rating FLOAT, precio INT NOT NULL, eliminado BOOLEAN DEFAULT FALSE, fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)');

    await connection.query('CREATE TABLE Genero (id_genero INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(50) NOT NULL)');
    
    await connection.query('CREATE TABLE Pelicula_Genero (id_pelicula INT, id_genero INT, PRIMARY KEY (id_pelicula, id_genero), FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula), FOREIGN KEY (id_genero) REFERENCES Genero (id_genero))');
    
    await connection.query('CREATE TABLE Reparto (id_persona INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)');
    
    await connection.query('CREATE TABLE Pelicula_Reparto (id_pelicula INT, id_persona INT, rol ENUM("Actor", "Director", "Actriz") NOT NULL, personaje VARCHAR(100), PRIMARY KEY (id_pelicula, id_persona), FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula), FOREIGN KEY (id_persona) REFERENCES Reparto (id_persona))');
    
    await connection.query('CREATE TABLE Usuario (id_usuario INT PRIMARY KEY AUTO_INCREMENT, rol ENUM("Admin", "Cliente") DEFAULT "Cliente", nombre VARCHAR(100) NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, contraseña VARCHAR(100) NOT NULL)');
    
    await connection.query('CREATE TABLE Promocion (id_descuento INT PRIMARY KEY AUTO_INCREMENT, nombre VARCHAR(100) NOT NULL, porcentaje DECIMAL(5,2) NOT NULL)');
    
    await connection.query('CREATE TABLE ticket_de_compra (id_ticket INT PRIMARY KEY AUTO_INCREMENT, id_usuario INT, nombre_pelicula VARCHAR(100) NOT NULL, fecha DATETIME NOT NULL, formato_pelicula ENUM("2D", "3D", "IMAX") NOT NULL, horario TIME NOT NULL, cantidad INT NOT NULL, id_promocion INT, total INT NOT NULL, FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario), FOREIGN KEY (id_promocion) REFERENCES Promocion (id_descuento))');
    
    await connection.query('CREATE TABLE Consulta (id_consulta INT PRIMARY KEY AUTO_INCREMENT, motivo VARCHAR(100) NOT NULL, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, telefono VARCHAR(15), mensaje TEXT NOT NULL, preferencia_respuesta ENUM("Email", "Teléfono") NOT NULL)');
    
    await connection.query('CREATE TABLE Carrito (id_carrito INT PRIMARY KEY AUTO_INCREMENT, id_usuario INT, estado ENUM("Pendiente", "Pagado", "Cancelado") DEFAULT "Pendiente", total INT NOT NULL, FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario))');
    
    await connection.query('CREATE TABLE carrito_pelicula (id_carrito INT, id_pelicula INT, cantidad INT NOT NULL, PRIMARY KEY (id_carrito, id_pelicula), FOREIGN KEY (id_carrito) REFERENCES Carrito (id_carrito), FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula))');
    
    // Ejecutar el script
    // await connection.query(sqlScript);

    console.log('Tablas creadas exitosamente.');
    connection.end();
  } catch (error) {
    console.error('Error al crear las tablas:\n', error);
    connection.end();
  }
  
};

// createTables();




seedDatabase();
