const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//find all of the data and post on the dashboard
router.get('/', async (req, res) => {
    try {
        const dashboardData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'email']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'email']
                }
            ]
        })

        const posts = dashboardData.map((posts) => posts.get({ plain: true }));

        res.render('dashboard', {
            posts: posts, logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//find a post & be able to edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dashboardData = await Post.findOne({
          where: 
          {
              id: req.params.id
          }, 
          attributes: [
              'id',
              'title',
              'created_at',
              'post_content'
          ],
          include: [
              {
                  model: Comment,
                  attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                  ], 
                  include: {
                      model: User,
                      attributes: ['email', 'username']
                  }
              }
          ]
        });
    
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }

        const posts = dashboardData.get({ plain: true });
    
        res.render('editPost', {
            posts: posts, 
            logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

//render a new post 
router.get('/create/', withAuth, async (req, res) => {
    try {
        const dashboardData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                }
            ]
        })

        const posts = dashboardData.map((posts) => posts.get({ plain: true }));

        res.render('newPost', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;