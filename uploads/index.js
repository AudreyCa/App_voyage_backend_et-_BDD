const express = require('ex^press');
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const { userInfo } = require('os');


const dossierUpload = './uploads';
const nomFichier = 'document_receptione';


let storage = multer.diskStorage({
    destination :  (req, file, cb) => {
            cb(null, dossierUpload)
    },
    destination :  (req, file, cb) => {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'))
    }
})

let upload =  multer({
    storage: storage
})

app.post('/upload', upload.single('document'), (req,res) => {
    if(!req.file) {
        console.log('Erreur lors de l\'upload');
        return res.send({success: false})
    } else {
        console.log('Le fichier est uploadé');
        return res.send({success: true})
    }
})
app.listen(8080)