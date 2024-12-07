const { z } = require('zod');

// Esquema de validación para el controlador createPelicula
const peliculaSchema = z.object({
    titulo: z.string().nonempty("El título es obligatorio."),
    duracion: z.number().int().positive("La duración debe ser un número entero positivo."),
    clasificacion: z.string().nonempty("La clasificación es obligatoria."),
    descripcion: z.string().nonempty("La descripción es obligatoria."),
    anio: z.number().int().gte(1888, "El año debe ser mayor o igual a 1888."),
    pais: z.string().nonempty("El país es obligatorio."),
    img_url: z.string().url("La URL de la imagen no es válida."),
    trailer_url: z.string().url("La URL del tráiler no es válida."),
    rating: z.number().min(0).max(10),
    precio: z.number().positive("El precio debe ser un número positivo."),
    generos: z.array(
        z.object({
            id: z.number().int().positive("El ID del género debe ser un número entero positivo.")
        })
    ).nonempty("Debe haber al menos un género."),
    reparto: z.array(
        z.object({
            nombre: z.string().nonempty("El nombre del actor/director es obligatorio."),
            apellido: z.string().nonempty("El apellido del actor/director es obligatorio."),
            rol: z.string().nonempty("El rol es obligatorio.") 
        })
    ).nonempty("Debe haber al menos un miembro en el reparto."),
});

module.exports = { peliculaSchema };
