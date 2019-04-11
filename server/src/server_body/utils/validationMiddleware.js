const yup = require('yup');
import {Users} from '../models';

const AppError = require('./AppError');


const SchemaBody = yup.object().shape({
    email: yup.string().email({status: 403, message: 'Not valid email'}),
    password: yup.string()
        .required()
});

module.exports.body = (err, req, res, next) => {
    SchemaBody.validate(req.body)
        .then(b => {
            if (b) {
                next();
            } else
                next(err.error);
        }).catch(
        (err) => {
            console.log("ERRRRRR - " + JSON.stringify(err));
            //res.status(403);
            next(err.error)
        }
    );
};

module.exports.existEmail = (err, req, res, next) => {
    Users.count({where: {email: req.body.email}})
        .then(c => {
            if (isNaN(c)) {
                res.status(500);
                res.json({
                    success: false,
                    message: 'The email you specified is already existing, from validationMiddleware'
                });
            } else {
                next();
            }
        }).catch(
        () => next(new AppError.userFoundError("Wrong email, from validationMiddleware"))
    );
};
