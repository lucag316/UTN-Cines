const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next(); // Continuar si la validación es exitosa
    } catch (error) {
        return res.status(400).json({
            message: "Error de validación",
            errors: error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            })),
        });
    }
};

module.exports = { validate };
