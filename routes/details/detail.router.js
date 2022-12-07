const express = require("express");
const myRouter = express.Router();
const { getAllDetails, getAllDetailsOneList, getOneDetailOneList, postDetail, putDetail, deleteDetail } = require('./detail.controller')

// quand on a fait les controllers, on transforme comme ceci :
myRouter.route('/detail')
    .get(getAllDetails)

myRouter.route('/detail/:id')
    .get(getAllDetailsOneList)
    .post(postDetail)
    .put(putDetail)
    .delete(deleteDetail)

myRouter.route('/onedetail/:id')
    .get(getOneDetailOneList)


// puis on exporte le router
module.exports = myRouter