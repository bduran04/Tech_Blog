const { Post } = require('../models');

const postData = [
    {
        title: "Tech Blog is here!",
        post_content: "This is the first post to the tech blog; go HAM y'all",
        user_id: 1
    }, {
        title: "Plant Based is the way to go",
        post_content: "Eat more plants y'all; they're healthier than meat, but be sure not to skimp on your protein",
        user_id: 2
    }, {
        title: "Cats are analzing y'all",
        post_content: "They take care of themselves; you just have to clean their litterbox!",
        user_id: 3
    }

]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;