CREATE TABLE `Pelicula` (
  `id_pelicula` int PRIMARY KEY AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `duracion` int NOT NULL,
  `clasificacion` varchar(20),
  `descripcion` text,
  `anio` year NOT NULL,
  `pais` varchar(50),
  `img_url` varchar(100),
  `trailer_url` varchar(100),
  `rating` float,
  `precio` int NOT NULL,
  `eliminado` bool DEFAULT false,
  `fecha_creacion` datetime DEFAULT (current_timestamp),
  `fecha_modificacion` datetime DEFAULT (current_timestamp)
);

CREATE TABLE `Genero` (
  `id_genero` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL
);

CREATE TABLE `Pelicula_Genero` (
  `id_pelicula` int,
  `id_genero` int,
  PRIMARY KEY (`id_pelicula`, `id_genero`)
);

CREATE TABLE `Reparto` (
  `id_persona` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
);

CREATE TABLE `Pelicula_Reparto` (
  `id_pelicula` int,
  `id_persona` int,
  `rol` enum(Actor,Director,Actriz),
  `personaje` varchar(100),
  PRIMARY KEY (`id_pelicula`, `id_persona`)
);

CREATE TABLE `Usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `rol` enum(Admin,Cliente) DEFAULT 'Cliente',
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) UNIQUE NOT NULL,
  `contraseña` varchar(100) NOT NULL
);

CREATE TABLE `Promocion` (
  `id_descuento` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `porcentaje` decimal(5,2) NOT NULL
);

CREATE TABLE `ticket_de_compra` (
  `id_ticket` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int,
  `nombre_pelicula` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL,
  `formato_pelicula` enum(2D,3D,IMAX) NOT NULL,
  `horario` time NOT NULL,
  `cantidad` int NOT NULL,
  `id_promocion` int,
  `total` int NOT NULL
);

CREATE TABLE `Consulta` (
  `id_consulta` int PRIMARY KEY AUTO_INCREMENT,
  `motivo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15),
  `mensaje` text NOT NULL,
  `preferencia_respuesta` enum(Email,Teléfono) NOT NULL
);

CREATE TABLE `Carrito` (
  `id_carrito` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int,
  `estado` enum(Pendiente,Pagado,Cancelado) DEFAULT 'Pendiente',
  `total` int NOT NULL
);

CREATE TABLE `carrito_pelicula` (
  `id_carrito` int,
  `id_pelicula` int,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_carrito`, `id_pelicula`)
);

ALTER TABLE `Pelicula_Genero` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);

ALTER TABLE `Pelicula_Genero` ADD FOREIGN KEY (`id_genero`) REFERENCES `Genero` (`id_genero`);

ALTER TABLE `Pelicula_Reparto` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);

ALTER TABLE `Pelicula_Reparto` ADD FOREIGN KEY (`id_persona`) REFERENCES `Reparto` (`id_persona`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`id_promocion`) REFERENCES `Promocion` (`id_descuento`);

ALTER TABLE `Carrito` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`);

ALTER TABLE `carrito_pelicula` ADD FOREIGN KEY (`id_carrito`) REFERENCES `Carrito` (`id_carrito`);

ALTER TABLE `carrito_pelicula` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);
