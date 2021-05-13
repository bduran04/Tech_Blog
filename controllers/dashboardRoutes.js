const router = require('express').Router();
const sequelize = require('..config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//find all of the data and post on the dashboard
router.get('/', withAuth, async (req, res) => {

});

//find a post & be able to edit
router.get('/edit/:id', withAuth, async (req, res) => {
 
});

//render a new post 
router.get('/new', async (req, res) => {

});


module.exports = router;