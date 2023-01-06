const express = require("express");
const cors = require("cors");
const axios = require('axios'); //  Axios est un client HTTP basé sur les promesses, compatible avec node.js et les navigateurs.
const fs = require("fs").promises



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


// pour le déployement du site static + redirection au refresh
app.use('/js', express.static(__dirname + '/js'));
app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/partials', express.static(__dirname + '/partials'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});



// Middleware pour recuperer et lire les messages de la page de contact à l'adresse : http://localhost:8080/messages
//  pour lire les messages stocker dans msgContactForm.json 
app.get('/messages', function (req, res) {
 
fs.readFile('msgContactForm.json','utf8').then((fileContent) => {
    res.send(fileContent)
});
})

// pour récupérer les données du formulaire à l'adresse /contact et les mettre dans le fichier json
app.post('/contact', function(req, res) {
  addUserInFile(req.body);
  console.log(req.body);
  res.send(req.body);

});



// app.get('/',(req,res) => {
//   res.redirect('/index.html');
// });



app.listen(port, () => {
  console.log(`L'application est lancée sur le port : ${port}`);
});



function addUserInFile(message){
    fs.readFile('msgContactForm.json','utf8').then((fileContent) => {
        let messages = JSON.parse(fileContent);
        messages.push(message);
        fs.writeFile('msgContactForm.json', JSON.stringify(messages))
    });
}