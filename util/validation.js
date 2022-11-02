const joi = require("joi")

module.exports = {
    signupSchema : joi.object({
        locationId: joi.number().required(),
        email: joi.string().pattern(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/).required(),
        nickname: joi.string().min(2).max(8).required(),
        password: joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/).required(),
        confirm: joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/).required(),
        profileImage: joi.string().required()
    }),
    loginSchema : joi.object({
        email: joi.string().pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).required(),
        password: joi.string().pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/).required(),
    })
}