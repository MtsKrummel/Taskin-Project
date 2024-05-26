

export const validateSchema = (schema) => (req, res, next) => {
    //Con try catch evitamos que tumbe el servidor en caso de haber un error
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res
        .status(400)
        .json(error.errors.map((error) => error.message));
    }
}