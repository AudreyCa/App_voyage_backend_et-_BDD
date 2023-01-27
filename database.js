const Pool = require("pg").Pool // librairie node-postgres
require('dotenv').config()

// On instancie un nouvel objet de configuration pool avec les infos de notre BDD
const pool = new Pool({
    user: "audcan",
    password: process.env.BDD_password,
    host: "dpg-ceqoreha6gdovo1kkbtg-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "bdd_voyages_4eal",
    ssl:true
})

// puis on l'exporte
module.exports = pool