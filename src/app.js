const express = require('express');
const app = express();

// Pour lire le JSON qu'on reçoit dans le body
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API opérationnelle' }));

module.exports = app;
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));