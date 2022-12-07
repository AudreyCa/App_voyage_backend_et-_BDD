const pool= require('../../database')


exports.getAllDetails = (async (req, res) => {
    try {
        console.log(req.body);
        const allDetail = await pool.query("SELECT * FROM detail")

        res.json(allDetail.rows)
        console.log(allDetail.rows);

    } catch (err) {
        console.error(err.message);    
    }
})
exports.getAllDetailsOneList = (async (req, res) => {
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
exports.getOneDetailOneList = (async(req, res) => {
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
exports.postDetail = (async(req, res) => {
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
exports.putDetail = (async(req, res) => {
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
exports.deleteDetail = (async(req, res) => {
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