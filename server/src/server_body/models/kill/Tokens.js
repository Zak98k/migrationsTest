module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define('Tokens', {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER,
        // },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                key: 'id',
                model: 'Users'
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    Tokens.associate = function (models) {
        Tokens.belongsTo(models.Users, {foreignKey: 'userId', targetKey: 'id'})
    };

    return Tokens;
};
