'Use strict'

module.exports = (sequelize, DataTypes) => {
    const CommentReaction = sequelize.define('CommentReaction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reaction: { 
            type: DataTypes.TEXT, 
            allowNull: false
        }        
    }, {
        charset: 'utf8mb4'
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