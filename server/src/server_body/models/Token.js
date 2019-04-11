
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER,
        // },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        token:{
            type: DataTypes.STRING,
            allowNull:false
        }

    });
    Token.associate = function (models) {
        Token.belongsTo(models.Users,{foreignKey:'userId', targetKey:'id'} )
    };

    return Token;
};
