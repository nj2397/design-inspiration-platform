const Joi = require('joi');

const urlValidation = Joi.object().keys({
    url: Joi.string().uri().required(),
})

const inspirationLinksValidation = Joi.object().keys({
    urls: Joi.array().items(
        Joi.string().uri().required()
    ).min(1).required()
})

module.exports = {
    urlValidation,
    inspirationLinksValidation
}

