const express = require("express");
const myRouter = express.Router();
const { auth, getUser, postUser, postLogin, putUser, deleteUser } = require('./user.controller');


myRouter.route('/register')
    .post(postUser)

myRouter.route('/login')
    .post(postLogin)

myRouter.route('/user')
    .get(auth, getUser)

myRouter.route('/user/:id')
    .put(auth, putUser)
    .delete(auth, deleteUser)


// puis on exporte le router
module.exports = myRouter