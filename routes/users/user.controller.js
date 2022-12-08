require('dotenv').config()
const jwt = require('jsonwebtoken');
const pool = require('../../database');
const bcrypt = require('bcrypt'); // async library !!!


// fonction pour afficher les données de l'utilisateur après les avoir authentifier avec le token.
// Il n'y a plus les id. car plus de req.params
exports.getUser = (async (req, res) => {
    try {
        console.log(req.user.user_mail);

        const allUsers = await pool.query(`SELECT * FROM "USER"`)

        // Avec le token, on va filtrer les users suivant leur token et non leur id.
        res.json(allUsers.rows.filter(oneUser => oneUser.user_mail === req.user.user_mail))
        console.log(allUsers.rows.filter(oneUser => oneUser.user_mail === req.user.user_mail));

    } catch (err) {
        console.error(err.message);
    }
})

// fonction pour créer un utilisateur (first time)
exports.postUser = (async (req, res) => {
    try {
        // console.log('req.body dans post ici : ', req.body);
        const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;

        // hashage du Mdp : 
        const hashedPassword = await bcrypt.hash(user_mdp, 10)
        // 10 correspond au genSalt : const salt = await bcrypt.genSalt(10)

        const newUser = await pool.query(`INSERT INTO "USER" (user_firstName, user_lastName, user_mail, user_mdp) VALUES($1, $2, $3, $4) RETURNING *`, [user_firstName, user_lastName, user_mail, hashedPassword])

        res.json(newUser)

    } catch (err) {
        console.error(err.message);
        // res.status(401).send("Merci d'utiliser une autre adresse mail")

    }
})

// Fonction pour se loguer et vérifier les mot de passe.
exports.postLogin = (async (req, res) => {
    try {
        // console.log('req.body dans postLogin ici : ', req.body);
        const { user_mail, user_mdp } = req.body;

        const userLog = await pool.query(`SELECT * FROM "USER" WHERE user_mail = $1`,
            [user_mail])

        const user = { user_mail: user_mail, user_mdp: user_mdp } // const 'user" utile pour le token

        // pour vérifier si c'est la bonne adresse email
        if (userLog.rows.length === 0) return res.status(401).send("Email et/ou mot de passe incorrect")

        // vérfication du password
        const validPassword = await bcrypt.compare(user_mdp, userLog.rows[0].user_mdp)
        console.log(user_mdp);
        console.log(userLog.rows[0].user_mdp);
        if (!validPassword) return res.status(400).send('Mot de passe invalide')

        // Quand l'utilisateur se logue et ques ses id et mdp sont correct, on génère un token
        const accessToken = generateAccessToken(user)

        // on affiche le token en guise de réponse si les accès mail et mdp sont bons
        res.send({ accessToken: accessToken })

    } catch (err) {
        console.error(err.message);
    }
})

// fonction pour genérer le token avec le parm user.
function generateAccessToken(user) {
    // avec : jwt.sign(payload, secretOrPrivateKey), on génère un accès token avec une clé d'encodage située dans .env, du nom de ACCESS_TOKEN_SECRET
    // elle nous sert à signer un token JWT et le rendre valide. La fonction génère ensuite un token JWT qui peut être envoyé au serveur pour l'authentification.
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


// pour l'authentification avec le token
// Cette fonction nous sert à récupérer le token de la méthode post (une fois que le nouvel utilisateurs s'est enregistrer et de vérifier s'il existe bien pour passer à la requeste d'après avec next()
function authentificateToken(req, res, next) {

    const authHeader = req.headers['authorization'] // Bearer TOKEN
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null) return res.sendStatus(401) // message erreur : "unauthorized" (requête non authentifiée) = il n'a pas le token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) {
            return res.sendStatus(403) // message d'erreur : "Forbidden" (le serveur refuse d'executer la requete alors qu'il a le token : mauvaise authentification.
        } else {
            req.user = user
            // on assigne user à req.user. On se servira de req.user dans la méthode get
            console.log('req.user: ', req.user);
            // puis on next avec la requete
            next()
        }

    })

}

exports.auth = authentificateToken

exports.putUser = (async (req, res) => {
    try {
        // On envoie toutes les infos (id et prenom, nom, mail, mdp de user)
        const { id } = req.params // Meme logique qu'au dessus
        const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;

        // hashage du Mdp aussi au moment du put: 
        const hashedPassword = await bcrypt.hash(user_mdp, 10)

        const majProfil = await pool.query(`UPDATE "USER" SET user_firstName = $1, user_lastName = $2, user_mail = $3, user_mdp = $4 WHERE user_id = $5 RETURNING *`,
            [user_firstName, user_lastName, user_mail, hashedPassword, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json(majProfil.rows);
        console.log("Données bien transmises", majProfil.rows);
        
    } catch (err) {
        console.error(err.message);
    }
})

exports.deleteUser = (async (req, res) => {
    try {
        const { id } = req.params
        const supprimerProfil = await pool.query(`DELETE FROM "USER" WHERE user_id = $1`,
            [id]
        )

        // Ici, on enverra un message pour signifier que la donnée à bien été supprimé
        res.json("Donnée bien effacée");
        console.log("Donnée bien effacée");

    } catch (err) {
        console.error(err.message);
    }
})

