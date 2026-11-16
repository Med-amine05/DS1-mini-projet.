// Ce middleware limite l'accès à certains rôles (ex: manager seulement)
module.exports = (...rolesAutorises) => (req, res, next) => {
  if (!rolesAutorises.includes(req.user.role))
    return res.status(403).json({ message: 'Accès interdit, ce n\'est pas pour toi' });
  next();
};