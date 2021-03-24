const { json } = require('express');
const ProjectsModel = require('../models/projectsModel.js');

// Display Portal View
function portalView(req, res){
    var sess=req.session;
    console.log(sess.client);
    params = sess.client.rows;
    res.render('pages/myportal',params);
}

// Display Account view
function accountView(req,res){
    var sess=req.session;
    console.log(sess.client);
    params = sess.client.rows;
    res.render('pages/account',params);
}

// Display Projects view
function projectsView(req,res){
    ProjectsModel.getProjectsinfo(client_id, function(req,res){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json("OK");
    });
}


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

//Make a post

function regPost (req, res){
    let sampleFile;
    let post_description = req.body.post_description;
    let project_id = 16; // Este valor tiene que venir del portal con un input hidden. Cuando arme la pantalla.
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    // Look for a session
    sess=req.session;
    client_username = sess.client.rows[0].client_username;
    sampleFile = req.files.sampleFile;
    uploadPath = './pictures/' + client_username +sampleFile.name;

    //Data for Database
    post_image_path = client_username + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    
    //Send image to the Model
    ProjectsModel.regPostinDB(post_description, post_image_path, project_id, function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        return res.render('pages/myportal');
    });

    });

}

module.exports = {
    regProject:regProject,
    regPost:regPost,
    portalView:portalView,
    projectsView:projectsView,
    accountView:accountView
}; 