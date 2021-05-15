const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts for the homepage 
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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

        const posts = postData.map((post) =>

            post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a single post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
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
        });
        if (postData) {
            const post = postData.get({ plain: true });

            res.render('singlePost', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('signup');
});

module.exports = router;