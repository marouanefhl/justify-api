const justifySize = require('../../common/config/env.config').justifySize

// Méthode justify
// 
// Méthode principale du contrôleur de l'endpoint 'api/justify'
// Permet de justifier un texte envoyé dans une requête HTTP 
// 
// Description de l'algorithme : 
// - On commence premièrement par extraire à partir du texte envoyé les différents paragraphes (détectés à l'aide d'un retour à la ligne)
// puis les différents mots au sein de ceux-ci (séparés par un espace)
// - On en extrait ensuite le nombre maximal de mots par ligne en prenant un nombre de caractères inférieur au nombre maximal de caractères
// - On commence à ajouter des espaces de manière aléatoire (utilisation de Math.random()) afin de rajouter des espaces entre les mots jusqu'à
// arriver au nombre maximal de caractères par ligne (excepté pour la dernière ligne où on concatène juste les mots sans rajouter d'espaces)
//
exports.justify = (req, res) => {
    var paragraphs = req.body.split("\n") // Extraction des paragraphes
    var paragraphsJustified = []
    for(var x in paragraphs) {
        var words = paragraphs[x].split(' ') // Extraction des mots
        var lines = []
        var lineSize = 0
        var lineNumber = 0
        lines[lineNumber] = []
        words.forEach(function(word) { // Détection du nombre de mots par ligne
            lineSize += word.length
            if(lineSize > justifySize) {
                lineSize = word.length
                lineNumber++
                lines[lineNumber] = []
            }
            lineSize++
            lines[lineNumber].push(word)
        })

        var linesJustified = []
        for(var y in lines) { // Justification du texte
            if(y == lines.length - 1) { // Cas de la dernière ligne
                linesJustified[y] = lines[y].join(' ')
            } else { 
                var currentLength = lines[y].length - 1
                lines[y].forEach(word => {
                    currentLength += word.length
                })
                var randomWord = [...Array(lines[y].length - 1).keys()] // Création d'un array d'indices aléatoires
                while(currentLength < justifySize) {
                    if(randomWord.length == 0) {
                        randomWord = [...Array(lines[y].length - 1).keys()] // Recréation de l'array au cas où celui-ci se vide (manque de beaucoup de caractères)
                    }
                    randomIndex = Math.floor(Math.random() * randomWord.length)
                    wordIndex = randomWord[randomIndex]
                    lines[y][wordIndex] += " "
                    currentLength++
                    randomWord.splice(randomIndex, 1) // On utilise l'indice obtenu aléatoirement pour rajouter un espace, puis on supprime celui-ci de l'array d'indices
                }
                linesJustified[y] = lines[y].join(' ')
            }
        }
        paragraphsJustified[x] = linesJustified.join("\n")
    }
    justifiedText = paragraphsJustified.join("\n")
    res.set('Content-Type', 'text/plain');
    res.status(200).send([justifiedText])
}