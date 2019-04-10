'use strict';
const outsalt = require('../services/salt/salt');
const salt = outsalt;
const jwt = require('jsonwebtoken');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Token', [{
                userId: 8,
                token: jwt.sign({id: 1, email: 'vasya@gmail.com'}, salt.tokenSalt, {expiresIn: '12h'})
            },
                {
                    userId: 9,
                    token: jwt.sign({id: 2, email: 'petrov@gmail.com'}, salt.tokenSalt, {expiresIn: '12h'})
                }],
            {});
    },

    down: (queryInterface, Sequelize) => {
    }
};
