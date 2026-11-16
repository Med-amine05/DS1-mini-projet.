const mongoose = require('mongoose');

// On se connecte à Mongo, si ça marche pas on arrête tout, mafamma hata fayda
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo est connecté, tout va bien !');
  } catch (err) {
    console.error('Aïe, connexion Mongo ratée :', err.message);
    process.exit(1);
  }
};