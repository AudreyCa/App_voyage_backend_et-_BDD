const pool= require('../../database')


exports.getAllLists = (async (req, res) => {
    try {
        console.log(req.body);
        const allLists = await pool.query("SELECT * FROM list")

        res.json(allLists.rows)
        console.log(allLists.rows);

    } catch (err) {
        console.error(err.message);    
    }
})

exports.getAllListsOneUser = (async (req, res) => {
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

exports.getOneListOneUser = (async(req, res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;

        const oneList = await pool.query("SELECT * FROM list WHERE list_id = $1",
        [id]
        )
        // console.log(req.params);
        res.json(oneList.rows);
        console.log(oneList.rows);
        
    } catch (err) {
        console.error(err.message);    
    }
})

exports.postList = (async(req, res) => {
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

exports.putList = (async(req, res) => {
    try {
        const { id } = req.params;
        const { list_title } = req.body;
        
        const majList = await pool.query("UPDATE list SET list_title = $1 WHERE list_id = $2 RETURNING *", 
        [list_title, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json(majList.rows[0]);
        console.log("Données bien transmises");
    } catch (err) {
        console.error(err.message);    
    }
})
exports.deleteList = (async(req, res) => {
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
exports.deleteAllList = (async(req, res) => {
    try {
        const { id } = req.params;

        const supprimerList = await pool.query("DELETE FROM list WHERE user_id = $1", 
        [id])

        // Ici, on enverra un message pour signifier que la donnée à bien été supprimé
        res.json("Donnée bien effacée");
        console.log("Donnée bien effacée");
    } catch (err) {
        console.error(err.message);    
    }
})