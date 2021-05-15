const { User } = require('../models');

const userData = [
    {
        name: "Robert", 
        email: "bob@bobmail.com",
        password: "password2"
    }, {
        name: "Jane", 
        email: "jane@janemail.com",
        password: "password3"
    }, {
        name: "Matt", 
        email: "matt@mattmail.com",
        password: "password4"
    }

]

const seedUsers = () => Post.bulkCreate(userData);

module.exports = seedUsers;