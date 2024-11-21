/* LOS CREATE TABLES DE LA BASE DE DATOS

CREATE DATABASE DB_UTN_CINES;

USE DB_UTN_CINES;

CREATE TABLE `Cine` (
  `id_cine` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100),
  `direccion` varchar(200),
  `ciudad` varchar(100)
);

CREATE TABLE `Sala` (
  `id_sala` int PRIMARY KEY AUTO_INCREMENT,
  `id_cine` int,
  `capacidad` int
);

CREATE TABLE `Butaca` (
  `id_butaca` int PRIMARY KEY AUTO_INCREMENT,
  `id_sala` int,
  `estado` varchar(20)
);

CREATE TABLE `Pelicula` (
  `id_pelicula` int PRIMARY KEY AUTO_INCREMENT,
  `titulo` varchar(200),
  `duracion` int,
  `clasificacion` varchar(20),
  `descripcion` text,
  `anio` datetime,
  `pais` varchar(50),
  `img_url` varchar(100),
  `trailer_url` varchar(100),
  `rating` double,
  `fecha_creacion` datetime,
  `fecha_modificacion` datetime
);

CREATE TABLE `Genero` (
  `id_genero` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50)
);

CREATE TABLE `Pelicula_Genero` (
  `id_pelicula` int,
  `id_genero` int
);

CREATE TABLE `Reparto` (
  `id_persona` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100),
  `apellido` varchar(100)
);

CREATE TABLE `Rol` (
  `id_rol` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50)
);

CREATE TABLE `Pelicula_Reparto` (
  `id_pelicula` int,
  `id_persona` int,
  `id_rol` int,
  `personaje` varchar(100)
);

CREATE TABLE `Funcion` (
  `id_funcion` int PRIMARY KEY AUTO_INCREMENT,
  `id_sala` int,
  `id_pelicula` int,
  `fecha` date,
  `hora` time,
  `formato` varchar(100)
);

CREATE TABLE `Usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `rol` varchar(100),
  `nombre` varchar(100),
  `email` varchar(150),
  `contraseÃ±a` varchar(100)
);

CREATE TABLE `Promocion` (
  `id_descuento` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100),
  `porcentaje` decimal(5,2)
);

CREATE TABLE `Reserva` (
  `id_reserva` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int,
  `id_funcion` int,
  `cantidad` int,
  `total` decimal(6,2)
);

CREATE TABLE `Reserva_Butaca` (
  `id_reserva` int,
  `id_butaca` int
);

CREATE TABLE `ticket_de_compra` (
  `id_ticket` int,
  `id_usuario` int,
  `email` varchar(100),
  `id_reserva` int,
  `nombre_pelicula` varchar(100),
  `fecha` datetime,
  `formato_pelicula` varchar(3),
  `horario` time,
  `cantidad` int,
  `id_butaca` int,
  `promocion` int,
  `total` int
);

CREATE TABLE `Consulta` (
  `id_consulta` int,
  `motivo` varchar(100),
  `nombre` varchar(100),
  `apellido` varchar(100),
  `email` varchar(100),
  `telefono` int,
  `mensaje` text,
  `preferencia_respuesta` varchar(100)
);

ALTER TABLE `Sala` ADD FOREIGN KEY (`id_cine`) REFERENCES `Cine` (`id_cine`);

ALTER TABLE `Butaca` ADD FOREIGN KEY (`id_sala`) REFERENCES `Sala` (`id_sala`);

ALTER TABLE `Pelicula_Genero` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);

ALTER TABLE `Pelicula_Genero` ADD FOREIGN KEY (`id_genero`) REFERENCES `Genero` (`id_genero`);

ALTER TABLE `Pelicula_Reparto` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);

ALTER TABLE `Pelicula_Reparto` ADD FOREIGN KEY (`id_persona`) REFERENCES `Reparto` (`id_persona`);

ALTER TABLE `Pelicula_Reparto` ADD FOREIGN KEY (`id_rol`) REFERENCES `Rol` (`id_rol`);

ALTER TABLE `Funcion` ADD FOREIGN KEY (`id_sala`) REFERENCES `Sala` (`id_sala`);

ALTER TABLE `Funcion` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `Pelicula` (`id_pelicula`);

ALTER TABLE `Reserva` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`);

ALTER TABLE `Reserva` ADD FOREIGN KEY (`id_funcion`) REFERENCES `Funcion` (`id_funcion`);

ALTER TABLE `Reserva_Butaca` ADD FOREIGN KEY (`id_reserva`) REFERENCES `Reserva` (`id_reserva`);

ALTER TABLE `Reserva_Butaca` ADD FOREIGN KEY (`id_butaca`) REFERENCES `Butaca` (`id_butaca`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`id_reserva`) REFERENCES `Reserva` (`id_reserva`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`id_butaca`) REFERENCES `Butaca` (`id_butaca`);

ALTER TABLE `ticket_de_compra` ADD FOREIGN KEY (`promocion`) REFERENCES `Promocion` (`id_descuento`);




ALTER TABLE  Pelicula MODIFY fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE  Pelicula  MODIFY fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE `Pelicula` MODIFY `img_url` varchar(255);

*/


/* 



INSERT INTO `Pelicula` (
    `titulo`, 
    `duracion`, 
    `clasificacion`, 
    `descripcion`, 
    `anio`, 
    `pais`, 
    `img_url`, 
    `trailer_url`, 
    `rating`
) VALUES (
    'The Holdovers', 
    133, -- duration in minutes
    'PG-13', 
    '"The Holdovers" es una comedia dramática dirigida por Alexander Payne. La historia sigue a Paul Hunham, un profesor gruñón interpretado por Paul Giamatti, que queda a cargo de un grupo de estudiantes que no pueden regresar a sus hogares durante las vacaciones de Navidad. A medida que pasan los días, se desarrolla una relación inesperada entre el profesor, los estudiantes y otros personajes que también permanecen en la escuela durante el período festivo, llevando a momentos conmovedores y cómicos."',
    '2024-11-20', -- release year and date
    'USA', 
    'https://m.media-amazon.com/images/M/MV5BOWY3MjUzZTctOTI5ZC00MDA5LTk4ZTMtZWJjNjRmMzE4ZmI2XkEyXkFqcGc@._V1_.jpg', 
    'https://www.youtube.com/embed/zHXuO7rA-s4?si=6Yshk31iO-BCdqes', 
    4.2
);

INSERT INTO `Genero` (`nombre`) VALUES 
('Drama'),
('Comedy');

-- Replace `1` with the actual `id_pelicula` if different
INSERT INTO `Pelicula_Genero` (`id_pelicula`, `id_genero`) VALUES 
(1, 1), -- Drama
(1, 2); -- Comedy

INSERT INTO `Reparto` (`nombre`, `apellido`) VALUES 
('Alexander', 'Payne'),  -- Director
('Paul', 'Giamatti'),    -- Main Actor
('Da’Vine Joy', 'Randolph'), -- Supporting Actor
('Dominic', 'Sessa');    -- Supporting Actor

INSERT INTO `Rol` (`nombre`) VALUES 
('Director'),
('Actor');

-- Assuming `id_pelicula` for "The Holdovers" is 1
INSERT INTO `Pelicula_Reparto` (`id_pelicula`, `id_persona`, `id_rol`, `personaje`) VALUES 
(1, 1, 1, NULL),       -- Alexander Payne as Director
(1, 2, 2, 'Paul Hunham'), -- Paul Giamatti as the main character
(1, 3, 2, 'Mary'),       -- Da’Vine Joy Randolph as a supporting character
(1, 4, 2, 'Angus');      -- Dominic Sessa as another supporting character

*/