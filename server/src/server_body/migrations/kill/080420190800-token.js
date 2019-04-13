'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tokens', {
            // id: {
            //     allowNull: false,
            //     autoIncrement: true,
            //     primaryKey: true,
            //     type: Sequelize.INTEGER
            // },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    key: 'id',
                    model: 'Users'
                }
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
            },

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tokens');
    }
};
