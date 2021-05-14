const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    //this will need id, title, content, & user id as an object
    //as well as below text
    // {
    //     sequelize,
    //     freezeTableName: true,
    //     underscored: true,
    //     modelName: 'post',
    //   }
});

module.exports = Post;