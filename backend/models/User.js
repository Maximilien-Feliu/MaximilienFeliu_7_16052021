'Use strict'

const Sequelize = require( 'sequelize' );
const db = require( '../config/database.js' );

module.exports = db.define('User', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: { 
        type: Sequelize.STRING(50), 
        allowNull: false
    },
    password: { 
        type: Sequelize.STRING(255), 
        allowNull: false
    },
    username: { 
        type: Sequelize.STRING(75), 
        allowNull: false
    },
    bio: { 
        type: Sequelize.TEXT, 
        allowNull: true
    },
    attachment: { 
        type: Sequelize.STRING(255), 
        allowNull: true
    },
    isAdmin: {
        type: Sequelize.TINYINT,
        allowNull: false,
        default: 0
    }
}, {
    Sequelize
});


