const jwt = require('jsonwebtoken');
const User = require('../models/user');

// On fabrique le token avec l'id et le rôle dedans
const creerToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;
    const existe = await User.findOne({ login });
    if (existe) return res.status(400).json({ message: 'Ce login est déjà pris' });

    const user = await User.create({ nom, login, motDePasse, role });
    res.status(201).json({ id: user._id, login: user.login, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;
    const user = await User.findOne({ login });
    // Même message dans les deux cas, on donne pas d'indice au pirate
    if (!user || !(await user.verifierMotDePasse(motDePasse)))
      return res.status(401).json({ message: 'Login ou mot de passe incorrect' });

    res.json({ token: creerToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};