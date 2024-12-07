-- Creación de la tabla Pelicula
CREATE TABLE Pelicula (
  id_pelicula INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  duracion INT,
  clasificacion VARCHAR(20) DEFAULT "PG-13",
  descripcion TEXT,
  anio YEAR,
  pais VARCHAR(50),
  img_url VARCHAR(255),
  trailer_url VARCHAR(255),
  rating FLOAT,
  precio INT NOT NULL DEFAULT 5000,
  eliminado BOOLEAN DEFAULT FALSE,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Creación de la tabla Genero
CREATE TABLE Genero (
  id_genero INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);
-- Relación muchos a muchos entre Pelicula y Genero
CREATE TABLE Pelicula_Genero (
  id_pelicula INT,
  id_genero INT,
  PRIMARY KEY (id_pelicula, id_genero),
  FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula),
  FOREIGN KEY (id_genero) REFERENCES Genero (id_genero)
);

-- Creación de la tabla Reparto
CREATE TABLE Reparto (
  id_persona INT PRIMARY KEY AUTO_INCREMENT,
  nombre_completo VARCHAR(100),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL
);

-- Relación entre Pelicula y Reparto
CREATE TABLE Pelicula_Reparto (
  id_pelicula INT,
  id_persona INT,
  rol ENUM('Actor', 'Director') NOT NULL DEFAULT "Actor",
  PRIMARY KEY (id_pelicula, id_persona),
  FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula),
  FOREIGN KEY (id_persona) REFERENCES Reparto (id_persona)
);

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  rol ENUM('Admin', 'Cliente') DEFAULT 'Cliente',
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  contraseña VARCHAR(100) NOT NULL
);

-- Creación de la tabla Promocion
CREATE TABLE Promocion (
  id_descuento INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  porcentaje DECIMAL(5,2) NOT NULL
);

-- Creación de la tabla Ticket de Compra
CREATE TABLE ticket_de_compra (
  id_ticket INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  nombre_pelicula VARCHAR(100) NOT NULL,
  fecha DATETIME NOT NULL,
  formato_pelicula ENUM('2D', '3D', 'IMAX') NOT NULL DEFAULT "3D",
  horario TIME NOT NULL,
  cantidad INT NOT NULL,
  id_promocion INT,
  total INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
  FOREIGN KEY (id_promocion) REFERENCES Promocion (id_descuento)
);

-- Creación de la tabla Consulta
CREATE TABLE Consulta (
  id_consulta INT PRIMARY KEY AUTO_INCREMENT,
  motivo VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(15),
  mensaje TEXT NOT NULL,
  preferencia_respuesta ENUM('Email', 'Teléfono') NOT NULL DEFAULT "Email"
);

-- Creación de la tabla Carrito
CREATE TABLE Carrito (
  id_carrito INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  promocion INT,
  estado ENUM('Pendiente', 'Pagado', 'Cancelado') DEFAULT 'Pendiente',
  total INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
  FOREIGN KEY (promocion) REFERENCES Promocion (id_descuento)
);

-- Relación entre Carrito y Pelicula
CREATE TABLE carrito_pelicula (
  id_carrito INT,
  id_pelicula INT,
  cantidad INT NOT NULL,
  PRIMARY KEY (id_carrito, id_pelicula),
  FOREIGN KEY (id_carrito) REFERENCES Carrito (id_carrito),
  FOREIGN KEY (id_pelicula) REFERENCES Pelicula (id_pelicula)
);
