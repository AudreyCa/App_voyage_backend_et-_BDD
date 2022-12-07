const express = require('express');
// on importe express
const app = express();
const port = 5000;
const cors = require("cors");
// on importe cors
const pool = require("./database"); // lier au Pool dans le fichier database.js

// middleware :
app.use(cors())
// obtenir les données coté client :
app.use(express.json()) //req.body

// Maintenant, on construit les ROUTES avec les méthodes : POST/GET/DELETE/PUT (update)
// On fera des tests avec POSTMAN pour vérifier si les données se transmettent bien
// toujours async/await
// toujours try/catch pour limiter les erreurs - Test unitaire


// --------------------------------USER-------------------------------------
// l'user se crée un compte //POST
app.post("/user", async (req, res) => {
    try {
        // console.log(req.body);
        const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;

        const newUser = await pool.query (`INSERT INTO "USER" (user_firstName, user_lastName, user_mail, user_mdp) VALUES($1, $2, $3, $4) RETURNING *`, [user_firstName, user_lastName, user_mail, user_mdp])
        res.json(newUser)
        // console.log(newUser.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Pour vérifier la BDD des users grace à get all users :
app.get("/user", async (req,res) => {
    try {
        console.log(req.body);
        const allUsers = await pool.query(`SELECT * FROM "USER"`)
        // .rows pour n'avoir que le tableau d'objet (comprenant id et tache. 1 objet par donnée)
        res.json(allUsers.rows)
        console.log(allUsers.rows);

    } catch (err) {
        console.error(err.message);    
    }
    })

// Afficher les données d'un user sur sa page profil // GET 
app.get("/user/:id", async (req,res) => {
    try {
        // console.log(req.body);
        // on est spécifique, on recherche par rapport à l'id.
        //! L'user_id est dans req.params (valeur unique) MAIS ATTENTION, comme au format dans la ligne 50 ad "id"
        const { id } = req.params
        //! Attention, c'est pareil pour "id" dans le chemin de la requete en parametre.
        const dataUser = await pool.query(`SELECT * FROM "USER" WHERE user_id = $1`,
        [id]
        )
        // console.log(req.params);
        // on spécifie .rows[0] pour n'obtenir que l'objet et non le tableau d'objets
        res.json(dataUser.rows[0]);
        console.log(dataUser.rows[0]);
        
    } catch (err) {
        console.error(err.message);    
    }
    })

// pour que le user puisse changer les données de son profil // PUT pour UPDATE
app.put("/user/:id", async (req,res) => {
    try {
        // On envoie toutes les infos (id et prenom, nom, mail, mdp de user)
        const { id } = req.params // Meme logique qu'au dessus
        const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;
        const majProfil = await pool.query(`UPDATE "USER" SET user_firstName = $1, user_lastName = $2, user_mail = $3, user_mdp = $4 WHERE user_id = $5`,
        [user_firstName, user_lastName, user_mail, user_mdp, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json("Donnée bien transmise");
        console.log("Données bien transmises");
    } catch (err) {
        console.error(err.message);    
    }
    })


// Pour que le user ait la posiibilité de supprimer son profil // DELETE
app.delete("/user/:id", async (req,res) => {
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

// --------------------------------list-------------------------------------
// l'user se créer une à plusieurs listes //POST
app.post("/list/:id", async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;
        const { list_title } = req.body;

        const newList = await pool.query ("INSERT INTO list (user_id, list_title) VALUES($1, $2) RETURNING *",
         [id, list_title])
        res.json(newList)
 
    } catch (err) {
        console.error(err.message);
    }
})

// Test pour le bon fonctionnement mais ne pas utiliser sur l'appli : Afficher toutes les listes de tous les users// GET :
app.get("/list", async (req,res) => {
    try {
        console.log(req.body);
        const allLists = await pool.query("SELECT * FROM list")

        res.json(allLists.rows)
        console.log(allLists.rows);

    } catch (err) {
        console.error(err.message);    
    }
    })


// Afficher toutes les listes d'un utilisateur // GET spécifie id 
app.get("/list/:id", async (req,res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;

        const allListCurrentUser = await pool.query("SELECT * FROM list WHERE user_id = $1",
        [id]
        )

        // Attention, ici, ne pas aller plus loin que "rows" sinon ca n'affiche qu'une liste
        res.json(allListCurrentUser.rows);
        console.log(allListCurrentUser.rows);
        
    } catch (err) {
        console.error(err.message);    
    }
    })


// Afficher une seule liste (d'un utilisateur) ATTENTION, changement du nom du chemin // GET spécifie id 
app.get("/onelist/:id", async (req,res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;

        const oneList = await pool.query("SELECT * FROM list WHERE list_id = $1",
        [id]
        )
        // console.log(req.params);
        res.json(oneList.rows[0]);
        console.log(oneList.rows[0]);
        
    } catch (err) {
        console.error(err.message);    
    }
    })

// Pour modifier le titre de la liste // PUT pour UPDATE
app.put("/list/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { list_title } = req.body;
        const majList = await pool.query("UPDATE list SET list_title = $1 WHERE list_id = $2", 
        [list_title, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json("Donnée bien transmise");
        console.log("Données bien transmises");
    } catch (err) {
        console.error(err.message);    
    }
    })


// Pour supprimer la list // DELETE
app.delete("/list/:id", async (req,res) => {
    try {
        const { id } = req.params;

        const supprimerList = await pool.query("DELETE FROM list WHERE list_id = $1", 
        [id])

        // Ici, on enverra un message pour signifier que la donnée à bien été supprimé
        res.json("Donnée bien effacée");
        console.log("Donnée bien effacée");
    } catch (err) {
        console.error(err.message);    
    }
    })


// --------------------------------detail-------------------------------------
// l'user se créer un à plusieurs détails par liste //POST
app.post("/detail/:id", async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;
        const { detail_description } = req.body;

        const newDetail = await pool.query ("INSERT INTO detail (list_id, detail_description) VALUES($1, $2) RETURNING *", 
        [id, detail_description])
        res.json(newDetail)
 
    } catch (err) {
        console.error(err.message);
    }
})

// Test pour le bon fonctionnement mais ne pas utiliser sur l'appli : Afficher tous les détails de tous les users // GET :
app.get("/detail", async (req,res) => {
    try {
        console.log(req.body);
        const allDetail = await pool.query("SELECT * FROM detail")

        res.json(allDetail.rows)
        console.log(allDetail.rows);

    } catch (err) {
        console.error(err.message);    
    }
    })


// Afficher tous les détails d'une liste // GET spécifie id 
app.get("/detail/:id", async (req,res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;

        const allDetailCurrentList = await pool.query("SELECT * FROM detail WHERE list_id = $1", 
        [id]
        )

        // Attention, ici, ne pas aller plus loin que "rows" sinon ca n'affiche qu'une liste
        res.json(allDetailCurrentList.rows);
        console.log(allDetailCurrentList.rows);
        
    } catch (err) {
        console.error(err.message);    
    }
    })


// Afficher un seul détail d'une seule liste ATTENTION, changement du nom du chemin // GET spécifie id 
app.get("/onedetail/:id", async (req,res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;

        const oneDetail = await pool.query("SELECT * FROM detail WHERE detail_id = $1",
        [id]
        )
        // console.log(req.params);
        res.json(oneDetail.rows[0]);
        console.log(oneDetail.rows[0]);
        
    } catch (err) {
        console.error(err.message);    
    }
    })

// Pour modifier le détail (d'une liste) EDIT // PUT pour UPDATE
app.put("/detail/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { detail_description } = req.body;
        const majDetail = await pool.query("UPDATE detail SET detail_description = $1 WHERE detail_id = $2", 
        [detail_description, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json("Donnée bien transmise");
        console.log("Données bien transmises");
    } catch (err) {
        console.error(err.message);    
    }
    })


// Pour supprimer un détail (d'une liste) btn supprimer // DELETE
app.delete("/detail/:id", async (req,res) => {
    try {
        const { id } = req.params;

        const supprimerDetail = await pool.query("DELETE FROM detail WHERE detail_id = $1", [id])

        // Ici, on enverra un message pour signifier que la donnée à bien été supprimé
        res.json("Donnée bien effacée");
        console.log("Donnée bien effacée");
    } catch (err) {
        console.error(err.message);    
    }
    })



app.listen(port, () =>
    console.log(`App listening on port ${port}!`)
)