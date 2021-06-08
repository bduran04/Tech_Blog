const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       order: [['created_at', 'DESC']],
//       include: [
//         {
//           model: Comment,
//           include: {
//             model: User,
//           }
//         },
//         {
//           model: User
//         },
//       ]
//     });
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/:id', async (req, res) => {
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
          model: User,
          attributes: ['email', 'username']
        },
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
            attributes: ['email', 'username']
          }
        }
      ]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No post found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
      });
      console.log("Created!")
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      post_content: req.body.post_content
    }, {
      where: {
        id: req.params.id
      }
    }
    );

    if (!postData) {
      res.status(404).json({ message: 'No posts with this id located' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No comments with this id found!' });
      return;
    }

      res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;