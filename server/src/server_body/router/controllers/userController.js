import {Users} from "../../models";

const bcrypt = require('bcrypt');
const salt = require('../../services/salt/salt');
const jwtToken = require('jsonwebtoken');
const tokenSalt = salt.tokenSalt;


module.exports.getAllUsers = (req, res, next) => {
    Users.findAll().then(user => {
        if (user)
            res.send(user);
    })
        .catch(err => {
            next(err)
        });
};

module.exports.createUser = (req, res, next) => {
    Users.findOrCreate({
        where: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(salt.bcryptSalt))
        }
    })
        .then((result) => {
            const token = jwtToken.sign({email: result[0].email, id: result[0].id}, tokenSalt, {expiresIn: '12h'});
            res.status(200);
            res.json({
                success: true,
                message: 'User created',
                token: token
            });
        })
        .catch(err => {
            res.status(406);
            res.json({
                status: res.statusCode,
                success: false,
                message: 'Email is exist, user not created, From User controller',
                error: err.message
            })
        });
};

module.exports.auth = (req, res, next) => {

    Users.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user) {
                req.user = user;
                return bcrypt.compare(req.body.password, user.password);
            } else {
                res.status(500)
                    .json({
                        success: false,
                        message: "Wrong email"
                    });
            }
        })
        .then(isPasswordValid => {
            if (isPasswordValid) {
                const token = jwtToken.sign({email: req.body.email, id: req.body.id}, tokenSalt, {expiresIn: '12h'});
                res.json({
                    success: true,
                    message: "Authentification successful",
                    token: token,
                    userId: req.body.id
                })
            } else {
                res.status(500)
                    .json({
                        success: false,
                        message: "Authentification failed! try again"
                    });
            }
        }).catch(err => next(err))
};