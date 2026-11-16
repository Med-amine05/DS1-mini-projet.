const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  statut: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  deadline: Date,
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);