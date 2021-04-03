
// require the module Models
const { json } = require('express');
const session = require('express-session');
const ProjectsModel = require('../models/projectsModel.js');
const SocialModel = require('../models/SocialModel.js');



// Social View

function socialView(req,res){
    var sess=req.session;
    let params = sess.client.rows;
    let client_id = sess.client.rows[0].client_id;
    // Get clients information
    SocialModel.getClients(function(err,result){
        if (err){
            console.log("There is an error from Social Model");

        }
        let users_info = result.rows;
        data = {
            params:params,
            users_info:users_info
        }
        return res.render('pages/social', data);
    });
        
}
//social project
function socialProject(req,res){
    let client_id = req.query.client_id;

    ProjectsModel.getProjectsinfo(client_id, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json(result);
    });
}

module.exports = {
    socialView:socialView,
    socialProject:socialProject
}