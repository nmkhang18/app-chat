const Joi = require('joi')

module.exports.registValitdation = (data) => {

    const schema = Joi.object({
        fullname: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    })

    return schema.validate(data)
}

module.exports.loginValitdation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    })

    return schema.validate(data)
}