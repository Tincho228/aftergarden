const { json } = require('express');
const ProjectsModel = require('../models/projectsModel.js');


// Register new project
function regProject (req, res){
    project_name = req.body.project_name;
    project_description = req.body.project_description;
    sess=req.session;
    client_id = sess.client.rows[0].client_id;
    ProjectsModel.regProjectinDB(project_name,project_description,client_id, function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json("Project posted");
    });
}

function regImage (req, res){
    let sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = 'https://aftergarden.herokuapp.com/pictures/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
    });


    //Send image to the Model*/
    /*ProjectsModel.regImageinDB(image_name, image_path, function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json(result);
    });*/
    
    
    
}

module.exports = {
    regProject:regProject,
    regImage:regImage
}; 