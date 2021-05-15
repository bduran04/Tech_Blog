const { User } = require('../models');

const userData = [
    {
        username: "Robert", 
        email: "bob@bobmail.com",
        password: "password2"
    }, {
        username: "Jane", 
        email: "jane@janemail.com",
        password: "password3"
    }, {
        username: "Matt", 
        email: "matt@mattmail.com",
        password: "password4"
    }

]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;