const express = require("express");
const cors = require("cors");


// chemin des router
const routerUser = require('./routes/users/user.router')
const routerList = require('./routes/listes/list.router') 
const routerDetail = require('./routes/details/detail.router') 

const app = express();
const port = 8080


// middleware
app.use(cors())
app.use(express.json()); //req.body
//urlencoded :
app.use(express.urlencoded({extended: false}));


// mobilisation des routers
app.use(routerUser, routerList, routerDetail)


app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });