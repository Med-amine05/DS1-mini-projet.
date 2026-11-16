const router = require('express').Router();
const auth = require('../middlewares/auth');
const c = require('../controllers/project.controller');

router.use(auth); // toutes les routes projets sont protégées

router.route('/').post(c.creer).get(c.lister);
router.route('/:id').get(c.detail).put(c.modifier).delete(c.supprimer);

module.exports = router;