const validateRequest = (validationBody) => (req, res, next) => {
    const { error } = validationBody.validate(req.body);
    if (error) {
        return res.status(422).json({
            status: 422,
            message: error.details[0].message,
        });
    }
    next();
}

module.exports = {
    validateRequest,
}