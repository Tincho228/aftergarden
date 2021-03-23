const { json } = require('express');
const ProjectsModel = require('../models/projectsModel.js');


// Register new project
function regProject (req, res){
    project_name = req.body.project_name;
    project_description = req.body.project_description;
    client_id = req.body.client_id;
    console.log("Projects constroller processing...");
    ProjectsModel.regProjectinDB(project_name,project_description,client_id, function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json("Project posted");
    });
}



module.exports = {
    regProject:regProject
}; 