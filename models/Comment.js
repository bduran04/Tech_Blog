const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    //this will need id, text, user id, post id as an object
    //as well as below text
    // {
    //     sequelize,
    //     freezeTableName: true,
    //     underscored: true,
    //     modelName: 'comment',
    //   }
});

module.exports = Comment;