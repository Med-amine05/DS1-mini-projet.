# API Gestion de Projets et Tâches

## 1. Présentation du projet

Ce projet consiste à développer une API REST permettant la gestion des utilisateurs, des projets et des tâches. L'application utilise Express.js pour la création de l'API et MongoDB pour le stockage des données.

L'API permet aux utilisateurs de s'inscrire, de se connecter, de gérer leurs projets et leurs tâches. Un système d'authentification JWT et de gestion des rôles (`user` et `manager`) assure la sécurisation des fonctionnalités.

## 2. Auteur

Mohamed Amine Ben Massaoud

## 3. Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Postman

## 4. Fonctionnalités

- Inscription et connexion des utilisateurs.
- Authentification sécurisée par JWT.
- Gestion des rôles : utilisateur et manager.
- Création, consultation, modification et suppression des projets.
- Recherche et tri des projets.
- Création et gestion des tâches.
- Recherche et tri des tâches.
- Affectation des tâches par le manager.
- Contrôle d'accès selon le rôle de l'utilisateur.

## 5. Installation du projet

### Prérequis

- Node.js et npm installés.
- MongoDB installé et démarré.
- Git installé.

### Étapes d'installation

Cloner le dépôt :

```bash
git clone https://github.com/<ton-compte>/api-projets.git
```

Accéder au dossier :

```bash
cd api-projets
```

Installer les dépendances :

```bash
npm install
```

### Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gestion_projets
JWT_SECRET=un_secret_bien_costaud
```

**Remarque :** Le fichier `.env` ne doit pas être publié sur GitHub.

### Lancement du serveur

```bash
npm run dev
```

L'API sera accessible à l'adresse :

http://localhost:3000

## 6. Routes de l'API

| Méthode | Route | Description | Accès |
|---|---|---|---|
| POST | `/api/auth/register` | Inscription | Public |
| POST | `/api/auth/login` | Connexion | Public |
| POST | `/api/projects` | Créer un projet | Connecté |
| GET | `/api/projects` | Lister les projets | Connecté |
| GET | `/api/projects/:id` | Consulter un projet | Propriétaire ou manager |
| PUT | `/api/projects/:id` | Modifier un projet | Propriétaire ou manager |
| DELETE | `/api/projects/:id` | Supprimer un projet | Propriétaire ou manager |
| POST | `/api/tasks` | Créer une tâche | Connecté |
| GET | `/api/tasks` | Lister les tâches | Connecté |
| GET | `/api/tasks/:id` | Consulter une tâche | Connecté |
| PUT | `/api/tasks/:id` | Modifier une tâche | Selon les règles d'accès |
| DELETE | `/api/tasks/:id` | Supprimer une tâche | Selon les règles d'accès |
| PATCH | `/api/tasks/:id/affecter` | Affecter une tâche à un utilisateur | Manager |

## 7. Tests

Les endpoints de l'API sont testés à l'aide de Postman. Les tests portent notamment sur :

- L'inscription et la connexion.
- La génération et l'utilisation du token JWT.
- Les opérations CRUD sur les projets.
- Les opérations CRUD sur les tâches.
- Les restrictions d'accès selon les rôles.

## 8. Dépôt GitHub

Lien du projet : https://github.com/Med-amine05/DS1-mini-projet.
