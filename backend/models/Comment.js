'Use strict'

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        attachment: {
            type: DataTypes.STRING(255),
            allowNull: true
        } 
    }, {
        charset: 'utf8mb4'
    }); 
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
        Comment.belongsTo(models.Post, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade'  
        });
        Comment.hasMany(models.CommentReaction);
    };
    return Comment;
}