const Task = require('../models/task');
const Project = require('../models/project');

exports.creer = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projet } = req.body;

    // On vérifie que le projet existe bien avant d'y coller une tâche
    const projetTrouve = await Project.findById(projet);
    if (!projetTrouve) return res.status(404).json({ message: 'Projet introuvable' });

    // Ici on ignore volontairement "utilisateurAssigne", seul le manager peut (voir commit 9)
    const tache = await Task.create({ titre, description, statut, deadline, projet });
    res.status(201).json(tache);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.detail = async (req, res) => {
  const tache = await Task.findById(req.params.id);
  if (!tache) return res.status(404).json({ message: 'Tâche introuvable' });
  res.json(tache);
};
// Un user voit les tâches de ses projets ou celles qui lui sont assignées, le manager voit tout
const filtreAccesTaches = async (req) => {
  if (req.user.role === 'manager') return {};
  const mesProjets = await Project.find({ proprietaire: req.user.id }).distinct('_id');
  return { $or: [{ projet: { $in: mesProjets } }, { utilisateurAssigne: req.user.id }] };
};

// Exemple : GET /api/tasks?projet=ID&statut=todo&search=login&tri=deadline
exports.lister = async (req, res) => {
  try {
    const filtre = await filtreAccesTaches(req);
    const { search, statut, projet, tri } = req.query;

    if (search) filtre.titre = { $regex: search, $options: 'i' };
    if (statut) filtre.statut = statut;
    if (projet) filtre.projet = projet;

    const taches = await Task.find(filtre).sort(tri ? tri.split(',').join(' ') : '-dateCreation');
    res.json(taches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.modifier = async (req, res) => {
  try {
    const { titre, description, statut, deadline } = req.body;
    const tache = await Task.findOneAndUpdate(
      { _id: req.params.id, ...(await filtreAccesTaches(req)) },
      { titre, description, statut, deadline },
      { new: true, runValidators: true } // runValidators bloque les statuts bizarres
    );
    if (!tache) return res.status(404).json({ message: 'Tâche introuvable' });
    res.json(tache);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.supprimer = async (req, res) => {
  const tache = await Task.findOneAndDelete({ _id: req.params.id, ...(await filtreAccesTaches(req)) });
  if (!tache) return res.status(404).json({ message: 'Tâche introuvable' });
  res.json({ message: 'Tâche supprimée' });
};