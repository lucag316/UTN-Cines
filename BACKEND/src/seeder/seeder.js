

// seedDatabase.js
const {getConnection} = require('../database');
const data = require('./datos.json'); // Archivo JSON con los datos

const seedDatabase = async () => {
  let connection;
  try {
    connection = await getConnection();

    // Insertar géneros
    for (const genero of data.generos) {
      const query = `INSERT IGNORE INTO Genero (id_genero, nombre) VALUES (?, ?)`;
      await connection.query(query, [genero.id, genero.name]);
    }

    // Insertar personas en el reparto
    for (const persona of data.reparto) {
      const nombreCompleto = persona.nombre || persona.name;
      const nombre = nombreCompleto.split(" ")[0];
      const apellido = nombreCompleto.split(" ").slice(1).join(" ") || ""; // Manejo de apellidos múltiples o faltantes
      const query = `INSERT IGNORE INTO Reparto (id_persona, nombre_completo, nombre, apellido) VALUES (?, ?, ?, ?)`;
      await connection.query(query, [persona.id, nombreCompleto, nombre, apellido]);
    }

    // Insertar películas
    for (const pelicula of data.peliculas) {
      const queryPelicula = `
        INSERT IGNORE INTO Pelicula (
          id_pelicula, titulo, duracion, clasificacion, descripcion, anio, pais,
          img_url, trailer_url, rating, precio, eliminado, fecha_creacion, fecha_modificacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
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
        pelicula.eliminado || false // Manejar valor predeterminado para eliminado
      ]);

      // Relacionar géneros con la película
      for (const genero of pelicula.generos) {
        const queryGenero = `INSERT IGNORE INTO Pelicula_Genero (id_pelicula, id_genero) VALUES (?, ?)`;
        await connection.query(queryGenero, [pelicula.id, genero.id]);
      }

      // Relacionar reparto con la película y el rol
      for (const miembro of pelicula.reparto) {
        const validRoles = ['actor', 'Director']; // Incluye 'Actriz' como opción válida
        if (validRoles.includes(miembro.rol)) {
          const queryReparto = `
            INSERT IGNORE INTO Pelicula_Reparto (id_pelicula, id_persona, rol)
            VALUES (?, ?, ?)
          `;
          await connection.query(queryReparto, [
            pelicula.id,
            miembro.id,
            miembro.rol
          ]);
        }
      }
    }

    console.log('Base de datos poblada exitosamente');
  } catch (error) {
    console.error('Error al poblar la base de datos:\n', error);
  }finally{
    connection.release(); // Liberar la conexión
  }
};



const createTables = async () => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`
      CREATE TABLE Pelicula (
        id_pelicula INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(200) NOT NULL,
        duracion INT NOT NULL,
        clasificacion VARCHAR(20),
        descripcion TEXT,
        anio YEAR NOT NULL,
        pais VARCHAR(50),
        img_url VARCHAR(100),
        trailer_url VARCHAR(100),
        rating FLOAT,
        precio INT NOT NULL,
        eliminado BOOLEAN DEFAULT FALSE,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE Genero (
        id_genero INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE Pelicula_Genero (
        id_pelicula INT,
        id_genero INT,
        PRIMARY KEY (id_pelicula, id_genero),
        FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula),
        FOREIGN KEY (id_genero) REFERENCES Genero (id_genero)
      )
    `);

    await connection.query(`
      CREATE TABLE Reparto (
        id_persona INT PRIMARY KEY AUTO_INCREMENT,
        nombre_completo VARCHAR(100),
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE Pelicula_Reparto (
        id_pelicula INT,
        id_persona INT,
        rol ENUM('actor', 'Director') NOT NULL DEFAULT "actor",
        PRIMARY KEY (id_pelicula, id_persona),
        FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula),
        FOREIGN KEY (id_persona) REFERENCES Reparto (id_persona)
      )
    `);

    await connection.query(`
      CREATE TABLE Usuario (
        id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        rol ENUM('Admin', 'Cliente') DEFAULT 'Cliente',
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        contraseña VARCHAR(100) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE Promocion (
        id_descuento INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        porcentaje DECIMAL(5,2) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE Ticket_de_Compra (
        id_ticket INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT,
        nombre_pelicula VARCHAR(100) NOT NULL,
        fecha DATETIME NOT NULL,
        formato_pelicula ENUM('2D', '3D', 'IMAX') NOT NULL,
        horario TIME NOT NULL,
        cantidad INT NOT NULL,
        id_promocion INT,
        total INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
        FOREIGN KEY (id_promocion) REFERENCES Promocion (id_descuento)
      )
    `);

    await connection.query(`
      CREATE TABLE Consulta (
        id_consulta INT PRIMARY KEY AUTO_INCREMENT,
        motivo VARCHAR(100) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        telefono VARCHAR(15),
        mensaje TEXT NOT NULL,
        preferencia_respuesta ENUM('Email', 'Teléfono') NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE Carrito (
        id_carrito INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT,
        estado ENUM('Pendiente', 'Pagado', 'Cancelado') DEFAULT 'Pendiente',
        total INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
      )
    `);

    await connection.query(`
      CREATE TABLE Carrito_Pelicula (
        id_carrito INT,
        id_pelicula INT,
        cantidad INT NOT NULL,
        PRIMARY KEY (id_carrito, id_pelicula),
        FOREIGN KEY (id_carrito) REFERENCES Carrito (id_carrito),
        FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula)
      )
    `);

    console.log('Tablas creadas exitosamente.');
  } catch (error) {
    console.error('Error al crear las tablas:\n', error);
  }
};


async function main(){
  
  await createTables();
  
  
  await seedDatabase();
}

main();