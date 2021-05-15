const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//router.get to locate all of the comment data
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No categories found!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//router.post to allow comments for users who are loggin in (withAuth)

//router.put to allow loggin in user to update their comment 

//router.delete to allow loggin in user to delete their comment 

module.exports = router;