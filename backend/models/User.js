const { Sequelize, DataTypes } = require( 'sequelize' );
const db = require( '../config/database.js' );

module.exports = sequelize.define('User', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    username: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    bio: { 
        type: DataTypes.STRING, 
        allowNull: true
    },
    attachment: { 
        type: DataTypes.STRING, 
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: false
    }
}, {
    modelName: 'user',
    tableName: 'users',
    Sequelize,
});


