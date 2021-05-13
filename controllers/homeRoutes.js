const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//find all of the data and post on the homepage without auth
router.get('/', async (req, res) => {

});

//render the page once logged in
router.get('/login', async (req, res) => {
 
});

//render signup page
router.get('/signup', async (req, res) => {

});

//finds one post, but doesnt allow the user to edit 
router.get('/post/:id', async (req, res) => {
 
});

module.exports = router;