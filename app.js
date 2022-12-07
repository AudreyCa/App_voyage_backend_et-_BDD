const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// chemin des router
const routerUser = require('./routes/users/user.router')
const routerList = require('./routes/listes/list.router') 
const routerDetail = require('./routes/details/detail.router') 

const app = express();
const port = 8080


// middleware
app.use(express.json()); //req.body
//urlencoded :
app.use(express.urlencoded({extended: false}));
// pour les cookies
app.use(cookieParser())


// mobilisation des routers
app.use(routerUser, routerList, routerDetail)


app.listen(port, () => {
    console.log(`L'application est lancée sur le port : ${port}`);
  });