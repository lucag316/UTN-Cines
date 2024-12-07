# Documentación del Backend para E-commerce de Películas

Este backend está diseñado para gestionar un e-commerce de compra de películas, permitiendo a los clientes explorar un catálogo, agregar películas al carrito y realizar compras. Además, cuenta con funcionalidades específicas para que los administradores gestionen el catálogo de películas mediante un CRUD (Crear, Leer, Actualizar, Eliminar).

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

### **Config**
- **create.sql**: Archivo que contiene los scripts para crear las tablas necesarias en la base de datos.

### **Controllers**
Contienen la lógica para manejar las solicitudes y respuestas relacionadas con cada funcionalidad.
- **AllGenerosController.js**: Gestiona la lógica relacionada con los géneros de las películas.
- **AllPeliculasController.js**: Se encarga de manejar las operaciones sobre el catálogo de películas (listar, filtrar, etc.).
- **AllRepartoController.js**: Gestiona las operaciones relacionadas con el reparto (actores y directores).
- **ConsultaController.js**: Gestiona las consultas de los usuarios.
- **PeliculaController.js**: Lógica específica para el CRUD de películas por parte del administrador.
- **UsuarioController.js**: Gestiona la lógica para los usuarios, incluyendo autenticación y roles.

### **Middlewares**
- **validateMiddleware.js**: Middleware encargado de validar los datos de entrada en las solicitudes, garantizando que cumplen con los formatos y requerimientos necesarios.

### **Models**
Definen las estructuras de las tablas y las relaciones con la base de datos.
- **PeliculaModel.js**: Modelo para la tabla `Pelicula`.
- **UsuarioModel.js**: Modelo para la tabla `Usuario`.

### **Routes**
Define las rutas del API para cada funcionalidad.
- **AllGenerosRoute.js**: Rutas para gestionar géneros.
- **AllPeliculasRoute.js**: Rutas para listar y filtrar películas.
- **AllRepartoRoute.js**: Rutas para el reparto.
- **ConsultaRoute.js**: Rutas para gestionar consultas.
- **PeliculaRoute.js**: Rutas para el CRUD de películas.
- **UsuarioRoute.js**: Rutas para la gestión de usuarios.
- **indexRoutes.js**: Archivo que centraliza y configura todas las rutas.

### **Seeder**
- **datos.json**: Archivo con datos iniciales para poblar las tablas de la base de datos.
- **seeder.js**: Script para cargar los datos iniciales desde `datos.json` a la base de datos.

### **Utils**
- **validator.js**: Contiene funciones auxiliares para validar datos y entradas.

### Otros Archivos Importantes
- **app.js**: Configuración principal del servidor Express.
- **database.js**: Configuración de la conexión a la base de datos.
- **index.js**: Archivo de entrada para iniciar el servidor.
- **.env**: Archivo para las variables de entorno.

---

## Funcionalidades Principales

### Para Clientes:
1. **Explorar el Catálogo de Películas**:
   - Ver detalles como título, duración, descripción, año, país, precio, clasificación, rating, entre otros.
   - Filtrar películas por género, reparto o año.

2. **Gestión del Carrito**:
   - Agregar películas al carrito.
   - Actualizar cantidades o eliminar películas.
   - Ver total de la compra.

3. **Realizar Compras**:
   - Comprar las películas seleccionadas en el carrito.
   - Aplicar promociones disponibles.

4. **Consultas**:
   - Enviar consultas al sistema con datos de contacto y preferencias.

### Para Administradores:
1. **CRUD de Películas**:
   - Crear nuevas películas con sus detalles.
   - Actualizar información de películas existentes.
   - Eliminar o marcar películas como inactivas.

2. **Gestión de Géneros y Reparto**:
   - Añadir, editar y eliminar géneros.
   - Gestionar el reparto (actores y directores).

3. **Promociones**:
   - Configurar descuentos y promociones para aplicar en las compras.

---

## Descripción de las Tablas

### Película (`Pelicula`)
Almacena información sobre las películas disponibles.
- **Campos destacados**: `titulo`, `duracion`, `clasificacion`, `precio`, `rating`.
- **Relaciones**: Muchos a muchos con `Genero`, uno a muchos con `Reparto`.

### Género (`Genero`)
Categorías a las que pertenecen las películas.
- **Relaciones**: Muchos a muchos con `Pelicula`.

### Reparto (`Reparto`)
Actores y directores asociados a las películas.
- **Relaciones**: Uno a muchos con `Pelicula`.

### Usuario (`Usuario`)
Usuarios registrados en el sistema.
- **Campos destacados**: `rol`, `email`, `contraseña`.
- **Relaciones**: Uno a muchos con `Carrito` y `Ticket de Compra`.

### Carrito (`Carrito`)
Gestión de los carritos de compras de los usuarios.
- **Relaciones**: Muchos a muchos con `Pelicula`.

### Promoción (`Promocion`)
Información sobre descuentos y promociones.

### Ticket de Compra (`ticket_de_compra`)
Historial de compras realizadas por los usuarios.
- **Relaciones**: Uno a muchos con `Usuario`, opcional con `Promocion`.

### Consulta (`Consulta`)
Registra consultas enviadas por los usuarios.

---

## Cómo Empezar

1. Clonar el repositorio.
2. Configurar las variables de entorno en el archivo `.env`.
3. Ejecutar los scripts de creación de tablas (`create.sql`).
4. Cargar datos iniciales con `seeder.js`.
5. Iniciar el servidor con `npm start`.

---

