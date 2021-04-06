module.exports = {
    "environment": "dev", 
    "port": 3000, // Le port sur lequel le serveur écoute
    "redisPort": 8000, // Le port relatif à la base de donnée Redis liée au Rate Limiting
    "appEndpoint": "http://localhost:3000",
    "apiEndpoint": "http://localhost:3000",
    "jwt_secret": "hNP8?5dpLkJ9G!kWFPwfj+^+y#qACd3h", // La clé secrète liée à la création d'un token JWT
    "jwt_expiration_in_seconds": 36000, // La durée après laquelle le token JWT expire 
    "permissionLevels": { // Les permissions des différents types d'utilisateurs
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    "justifySize": 80, // La taille en caractères de la ligne de justification
    "wordLimit": 80000, // La limite de mots, liée au Rate Limiting
    "limiterPeriod": 86400 // La durée pendant laquelle la limite de mots est active

}