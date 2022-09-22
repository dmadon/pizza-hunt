const router = require('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller');

// this is the /api/comments/<pizzaId> route
router.route('/:pizzaId').post(addComment);

// this is the /api/comments/<pizzaId>/<commentId> route
router.route('/:pizzaId/:commentId').delete(removeComment)


module.exports = router;