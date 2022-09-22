const router = require('express').Router();
const {addComment, removeComment, addReply, removeReply} = require('../../controllers/comment-controller');

// this is the /api/comments/<pizzaId> route
router.route('/:pizzaId').post(addComment);

// this is the /api/comments/<pizzaId>/<commentId> route
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// this is the /api/comments/<pizzaId>/<commentId>/<replyId> route
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);


module.exports = router;