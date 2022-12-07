const express = require("express");
// const { TokenExpiredError } = require("jsonwebtoken");
// const { deleteDetail } = require("../details/detail.controller");
const myRouter = express.Router();
const { auth, getUser, postUser, postLogin, putUser, deleteUser } = require('./user.controller');


myRouter.route('/user')
    .get(auth, getUser) // on ajoute le middleware pour que l'utilisateur puisse "get" l'user à partir de son token et non de son id.
// Attention, on importe aussi "auth" au dessus.

myRouter.route('/register')
    .post(postUser)

myRouter.route('/login')
    .post(postLogin)

myRouter.route('/user/:id')
    .put(putUser)
    .delete(deleteUser)


// puis on exporte le router
module.exports = myRouter