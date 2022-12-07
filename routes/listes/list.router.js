const express = require("express");
const myRouter = express.Router();
const { getAllLists, getAllListsOneUser, getOneListOneUser, postList, putList, deleteList } = require('./list.controller')

// quand on a fait les controllers, on transforme comme ceci :
myRouter.route('/list')
    .get(getAllLists)

myRouter.route('/list/:id')
    .get(getAllListsOneUser)
    .post(postList)
    .put(putList)
    .delete(deleteList)

myRouter.route('/onelist/:id')
    .get(getOneListOneUser)


// puis on exporte le router
module.exports = myRouter