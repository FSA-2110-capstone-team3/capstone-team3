const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/commentlikes', require('./commentLikes'));
router.use('/commentreplies', require('./commentReplies'));
router.use('/episodes', require('./episodes'));
router.use('/episodelikes', require('./episodeLikes'));
router.use('/shows', require('./shows'));
router.use('/timestamps', require('./timeStamps'));
router.use('/search', require('./search'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
