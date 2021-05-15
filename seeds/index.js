const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection')

const seedDataBase = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();

    process.exit(0);
}

seedDataBase();
