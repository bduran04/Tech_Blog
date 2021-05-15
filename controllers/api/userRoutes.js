const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//finds all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//gets user data for a specific id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'post_content',
                        'created_at']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});


//creates a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.email = userData.email;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//finds the user based on email, compares the data saved, and logs in if it matches the specific user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.email = userData.email;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//allows user to logout by ending the session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//allows the user to update their info
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })

        if (!userData[0]) {
            res
                .status(404)
                .json({ message: 'No user found using this id' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//allows user to delete their account
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!userData[0]) {
            res
                .status(404)
                .json({ message: 'No user found using this id' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;