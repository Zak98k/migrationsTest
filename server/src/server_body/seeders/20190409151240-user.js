'use strict';
const bcrypt = require('bcrypt');
const outsalt = require('../services/salt/salt');
const salt = outsalt;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users', [{
                email: 'vasya@gmail.com',
                password: bcrypt.hashSync('1111', bcrypt.genSaltSync(salt.bcryptSalt))
            },
                {
                    email: 'petrov@gmail.com',
                    password: bcrypt.hashSync('2222', bcrypt.genSaltSync(salt.bcryptSalt))
                }],
            {});
    },

    down: (queryInterface, Sequelize) => {
    }
};
