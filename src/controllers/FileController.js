const File = require("../models/File");
const Box = require('../models/Box');

class FileController{
    async store (req,res){
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file);
        await box.save();

        req.io.sockets.in(box._id).emit('file', file);  //todos usuários concetados naquela box com aquela id

        return res.json(file);
        //criar um arquivo
        //return res.send('ok');
    }
  
}

module.exports = new FileController();