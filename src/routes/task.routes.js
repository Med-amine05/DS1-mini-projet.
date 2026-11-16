const router = require('express').Router();
const auth = require('../middlewares/auth');
const c = require('../controllers/task.controller');

router.use(auth);

router.post('/', c.creer);
router.route('/:id').get(c.detail).put(c.modifier).delete(c.supprimer);
router.get('/', c.lister)
const role = require('../middlewares/role');
router.patch('/:id/affecter', role('manager'), c.affecter);
module.exports = router;