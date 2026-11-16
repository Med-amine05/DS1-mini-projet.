const router = require('express').Router();
const auth = require('../middlewares/auth');
const c = require('../controllers/task.controller');

router.use(auth);

router.post('/', c.creer);
router.get('/:id', c.detail);

module.exports = router;