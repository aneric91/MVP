# AgriConnect-Backend

## 📌 Présentation
AgriConnect-Backend est une API backend développée avec **Node.js**, **Express.js**, et **MongoDB** pour gérer des produits, l'authentification et les paiements via **Interswitch**.
## 🚀 Installation et Configuration

### 1️⃣ Prérequis  
Assurez-vous d'avoir installé :  
- **Node.js** (v18.x ou supérieur)  
- **MongoDB** (localement ou via un service cloud comme [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  
- **npm** (fourni avec Node.js)  

### 2️⃣ Accéder au projet  
cd AgriConnect-Backend

### 3️⃣ Installer les dépendances  
npm install express mongoose dotenv cors bcryptjs jsonwebtoken firebase-admin axios socket.io multer cloudinary
npm install

### 4️⃣ Configurer les variables d'environnement  
Créez un fichier `.env` à la racine du projet et ajoutez :  
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agriconnect
JWT_SECRET=votre_clé_secrète_pour_le_token
INTERSWITCH_API_KEY=votre_clé_api_interswitch
```
pour avoir le jwt_secret taper "openssl rand -base64 32" et copier le résultat dans le .env

📌 **Remarque :** Remplacez les valeurs par vos propres informations.

### 5️⃣ Démarrer MongoDB  
Si MongoDB est installé localement, démarrez le service :  
```bash
sudo systemctl start mongod
```
Vérifiez son statut :
sudo systemctl status mongod
Si vous utilisez **MongoDB Atlas**, assurez-vous de bien configurer `MONGODB_URI`.

### 6️⃣ Lancer le serveur  
node server.js
L'API sera disponible sur **http://localhost:5000**.

## 🛠 Tester les Routes API  

### 📌 1. Authentification  
#### ➡️ Inscription  
curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "jean@example.com", "password": "motdepasse123"}'

#### ➡️ Connexion  
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "jean@example.com", "password": "motdepasse123"}'
🔹 **Réponse attendue :** `{ "token": "votre_token_jwt" }`  
📌 **Utilisez ce token pour tester les routes sécurisées.**  

### 📌 2. Produits  
#### ➡️ Récupérer tous les produits  
curl -X GET http://localhost:5000/products

#### ➡️ Ajouter un produit
curl -X POST http://localhost:5000/products/add \
-H "Content-Type: application/json" \
-d '{"name": "Tomates", "category": "Légumes", "price": 5.99}'

## 🐞 Dépannage  
### ➤ Problème avec MongoDB ? 
Si `sudo systemctl start mongod` ne fonctionne pas, essayez :  
```bash
mongod --dbpath /var/lib/mongodb
```
Sinon allez sur la page https://doc.ubuntu-fr.org/mongodb

### ➤ Erreur `secretOrPrivateKey must have a value` ?  
Assurez-vous que `JWT_SECRET` est défini dans `.env` et que vous avez redémarré le serveur après modification.  

### ➤ Impossible d'installer MongoDB ?  
Essayez la commande suivante :  
```bash
sudo apt install -y mongodb-org
```
Si l'installation échoue, ajoutez le dépôt officiel MongoDB ([documentation ici](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)).
