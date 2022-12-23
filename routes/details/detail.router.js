const express = require("express");
const myRouter = express.Router();
const { getAllDetails, getAllDetailsOneList, getOneDetailOneList, postDetail, putDetail, deleteOneDetail, deleteAllDetail } = require('./detail.controller')

// quand on a fait les controllers, on transforme comme ceci :
myRouter.route('/detail')
    .get(getAllDetails)

myRouter.route('/detail/:id')
    .get(getAllDetailsOneList)
    .post(postDetail)
    .put(putDetail)
    .delete(deleteOneDetail)

myRouter.route('/onedetail/:id')
    .get(getOneDetailOneList)

myRouter.route('/alldetail/:id')
    .delete(deleteAllDetail)


// puis on exporte le router
module.exports = myRouter