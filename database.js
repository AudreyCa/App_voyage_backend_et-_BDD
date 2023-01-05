const Pool = require("pg").Pool
// librairie pg (postgres)

// On instancie une nouvelle pool avec le contenu de notre BDD
const pool = new Pool({
    user: "audcan",
    password: "sVpITAVqE5KP96Spx7frO3BTyyzZy7rm",
    host: "dpg-ceqoreha6gdovo1kkbtg-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "bdd_voyages_4eal",
    ssl:true
})

// on exporte pour le mettre dans index-s.js
module.exports = pool



// user: "postgres",
// password: "Digifab74",
// host: "localhost",
// port: 5432,
// database: "bdd_voyages"