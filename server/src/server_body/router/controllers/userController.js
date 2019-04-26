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
            email: req.body.email
        },
        defaults:{
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(salt.bcryptSalt))
        }
    })
        .then(([user,created]) => {
            const token = jwtToken.sign({email: user.email, id: user.id}, tokenSalt, {expiresIn: '12h'});
            res.status(200);
            res.json({
                success: created,
                message: created?'User created':'Email is exist, user not created.',
                token: created?token:null
            });
        })
        .catch(err => {
            console.log("Users.findOrCreate err - " + err);
            res.status(406);
            res.json({
                status: res.statusCode,
                success: false,
                message: 'Something wrong, user not created, From User controller',
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