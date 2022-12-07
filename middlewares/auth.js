// chemin avec middleware. Pour visualier l'objectif de l'auth :
// request > verify auth > route
// next pour "passer à l'étape suivante"


// function AuthentificateToken(req, res, next) {

// }



// function AuthentificateToken async(req, res, next) => {
//     try {
        
//         // Toujours nexter à la fin du try
//         next()

//     } catch (error) {
//         res.status(401).send('Merci de vous identifier')
//     }
// }




// // on exporte pour utilisation après :
// module.exports = authentification;