const jwt = require('jsonwebtoken');

// Ce middleware vérifie que le gars est bien connecté (token valide)
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token manquant, connecte-toi d\'abord' });

  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};