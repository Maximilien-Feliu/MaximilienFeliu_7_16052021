'Use strict'

module.exports = (sequelize, DataTypes) => {
    const CommentReaction = sequelize.define('CommentReaction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        like: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        laugh: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        heart: {
            type: DataTypes.STRING(7), 
            allowNull: true
        },
        angry: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        applaud: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        cry: {
            type: DataTypes.STRING(7),
            allowNull: true
        }
    }); 
    CommentReaction.associate = (models) => {
        CommentReaction.belongsTo(models.User, {  
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
        CommentReaction.belongsTo(models.Comment, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
    };
    return CommentReaction;
}