const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
app.use('/api/auth', require('./routes/auth.routes'));
module.exports = router;
