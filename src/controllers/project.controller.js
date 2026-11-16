const Project = require('../models/project');

// Un user ne touche qu'à ses projets, le manager touche à tout
const filtreAcces = (req) => (req.user.role === 'manager' ? {} : { proprietaire: req.user.id });

exports.creer = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;
    // Le propriétaire c'est celui qui est connecté, on le laisse pas choisir
    const projet = await Project.create({ nom, description, statut, proprietaire: req.user.id });
    res.status(201).json(projet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Exemple : GET /api/projects?search=web&statut=en cours&tri=-dateCreation
exports.lister = async (req, res) => {
  try {
    const filtre = filtreAcces(req);
    const { search, statut, tri } = req.query;

    // Recherche par nom (insensible à la casse)
    if (search) filtre.nom = { $regex: search, $options: 'i' };
    if (statut) filtre.statut = statut;

    // Tri : "nom" pour croissant, "-nom" pour décroissant (par défaut, les plus récents d'abord)
    const projets = await Project.find(filtre).sort(tri ? tri.split(',').join(' ') : '-dateCreation');
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.detail = async (req, res) => {
  const projet = await Project.findOne({ _id: req.params.id, ...filtreAcces(req) });
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  res.json(projet);
};

exports.modifier = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;
    const projet = await Project.findOneAndUpdate(
      { _id: req.params.id, ...filtreAcces(req) },
      { nom, description, statut },
      { new: true, runValidators: true }
    );
    if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
    res.json(projet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.supprimer = async (req, res) => {
  const projet = await Project.findOneAndDelete({ _id: req.params.id, ...filtreAcces(req) });
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  res.json({ message: 'Projet supprimé' });
};