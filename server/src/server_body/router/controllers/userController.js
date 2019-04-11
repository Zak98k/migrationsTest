import {Users} from "../../models/";

const bcrypt = require('bcrypt');
const salt = require('../../services/salt/salt');
const jwtToken = require('jsonwebtoken');
const bc = require('bcrypt');
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

    Users.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(salt.bcryptSalt))
    })
        .then((user) => {
            const token = jwtToken.sign({email: user.email,id:user.id}, tokenSalt, {expiresIn: '12h'});
            res.status(200);
            res.json({
                success: true,
                message: 'User created',
                token: token
            });
        })
        .catch(() => {
            res.status(406);
            res.json({
                success: false,
                message: 'Something wrong, user not created, From User controller'
            });

        })
};