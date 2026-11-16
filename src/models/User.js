const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['user', 'manager'], default: 'user' },
  dateCreation: { type: Date, default: Date.now }
});

// Avant de sauvegarder, on crypte le mot de passe, jamais en clair khouya !
userSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Petite méthode pour comparer le mot de passe tapé avec celui crypté
userSchema.methods.verifierMotDePasse = function (mdp) {
  return bcrypt.compare(mdp, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);