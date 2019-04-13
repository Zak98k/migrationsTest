'use strict';
const outsalt = require('../../services/salt/salt');
const salt = outsalt;
const jwt = require('jsonwebtoken');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Tokens', [{
                userId: 1,
                token: jwt.sign({id: 1, email: 'vasya@gmail.com'}, salt.tokenSalt, {expiresIn: '12h'})
            },
                {
                    userId: 2,
                    token: jwt.sign({id: 2, email: 'petrov@gmail.com'}, salt.tokenSalt, {expiresIn: '12h'})
                }],
            {});
    },

    down: (queryInterface, Sequelize) => {
    }
};
