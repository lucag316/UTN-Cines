 
const generoEndPointAPI = "https://api.themoviedb.org/3/genre/tv/list?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES"
const pelisEndPointAPI = "https://api.themoviedb.org/3/movie/popular?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES&page=1"


// seedDatabase.js
const connection = require('./db'); // Archivo que configura la conexión a la BD
const data = require('./data/data.json'); // Archivo JSON con los datos

const seedDatabase = async () => {
  try {
    // Insertar roles
    for (const role of data.roles) {
      const query = `INSERT INTO Rol (id_rol, nombre) VALUES (?, ?)`;
      await connection.promise().query(query, [role.id, role.name]);
    }

    // Insertar géneros
    for (const genero of data.generos) {
      const query = `INSERT INTO Genero (id_genero, nombre) VALUES (?, ?)`;
      await connection.promise().query(query, [genero.id, genero.name]);
    }

    // Insertar personas en el reparto
    for (const persona of data.reparto) {
      const nombreCompleto = persona.nombre || persona.name; // Para manejar las diferencias de nombres
      const apellido = ''; // El JSON no incluye apellido, por lo que se deja vacío
      const query = `INSERT INTO Reparto (id_persona, nombre, apellido) VALUES (?, ?, ?)`;
      await connection.promise().query(query, [persona.id, nombreCompleto, apellido]);
    }

    // Insertar películas
    for (const pelicula of data.peliculas) {
      const queryPelicula = `
        INSERT INTO Pelicula (
          id_pelicula, titulo, duracion, clasificacion, descripcion, anio, pais,
          img_url, trailer_url, rating, precio, fecha_creacion, fecha_modificacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      await connection.promise().query(queryPelicula, [
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
      ]);

      // Relacionar géneros con la película
      for (const genero of pelicula.generos) {
        const queryGenero = `INSERT INTO Pelicula_Genero (id_pelicula, id_genero) VALUES (?, ?)`;
        await connection.promise().query(queryGenero, [pelicula.id, genero.id]);
      }

      // Relacionar reparto con la película y el rol
      for (const miembro of pelicula.reparto) {
        const rolQuery = `SELECT id_rol FROM Rol WHERE nombre = ? LIMIT 1`;
        const [rolResult] = await connection.promise().query(rolQuery, [miembro.rol]);
        const idRol = rolResult.length > 0 ? rolResult[0].id_rol : null;

        if (idRol) {
          const queryReparto = `
            INSERT INTO Pelicula_Reparto (id_pelicula, id_persona, id_rol, personaje)
            VALUES (?, ?, ?, ?)
          `;
          await connection.promise().query(queryReparto, [
            pelicula.id,
            miembro.id,
            idRol,
            miembro.personaje || '', // Asignar personaje si está disponible
          ]);
        }
      }
    }

    console.log('Base de datos poblada exitosamente');
    connection.end();
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    connection.end();
  }
};

seedDatabase();
