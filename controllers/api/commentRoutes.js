const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//router.get to locate all of the comment data
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comments found!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//router.post to allow comments for users who are loggin in (withAuth)
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });

    if (req.session) {
      res.status(200).json(commentData);
    }
  
  } catch (err) {
    res.status(400).json(err);
  }
});

//router.delete to allow loggin in user to delete their comment 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No comments with this id found!' });
      return;
    }

    if (req.session) {
      res.status(200).json(commentData);
    }
  
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;