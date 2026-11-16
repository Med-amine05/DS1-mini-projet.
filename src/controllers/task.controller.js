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