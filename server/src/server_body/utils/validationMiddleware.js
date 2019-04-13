const yup = require('yup');
const AppError = require('./AppError');
import {Users} from '../models';


const SchemaBody = yup.object().shape({
    email: yup.string()
        .email({status: 403, message: 'Not valid email'}),
    password: yup.string()
        .required()
});

module.exports.body = (req, res, next) => {
    SchemaBody.validate(req.body)
        .then(b => {
            if (b) {
                next();
            } else
                throw new AppError.lackOfUserParameters('Not enough parameters, check input')
        })
        .catch(err => {
                next(err.error)
            }
        );
};

module.exports.existEmail = (req, res, next) => {
    Users.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user === null) {
                next()
            } else {
                throw new AppError.wrongEmail('This email is already in use.')
            }
        })
        .catch(err => next(err))
};

