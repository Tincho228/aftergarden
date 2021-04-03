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
    params = sess.client.rows;
    res.render('pages/account',params);
}

// Display Projects view
function projectsView(req,res){
    var sess=req.session;
    let client_id = sess.client.rows[0].client_id;
    let params = sess.client.rows;
    
    ProjectsModel.getProjectsinfo(client_id, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        let info = result.rows;
        data = {
            info:info,
            params:params
        }
        res.render('pages/projects',data);   
        
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
    let project_id = req.body.project_id; // Este valor tiene que venir del portal con un input hidden. Cuando arme la pantalla.
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
        console.log(project_id);
        let ref = "/blogView?project_id="+project_id;
        res.redirect(ref);
    });

    });
}
// Get Post info
function postInfo(req,res){
    let post_id = req.query.post_id;
    console.log("the post_id is :"+post_id);
    ProjectsModel.getSpecificPostInfo(post_id, function(err,result){
        if(err){
            console.log("There is an err from the Projects model");
        }
        res.json(result.rows);
    });
}

// Edit a Post
function editPost(req,res){
    let sampleFile;
    let post_id = req.body.post_id;
    let post_description = req.body.post_description;
    let post_image_path = req.body.post_image_path;
    if(!(post_image_path)){
        ProjectsModel.editPostDescriptioninDB(post_id, post_description, function(err,result){
            if(err){
                console.log("There is an err in the Projects Model");
            }
            console.log("text changed");
        });
    }
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
            ProjectsModel.editPostinDB(post_id, post_description, post_image_path, function(err,result){
                if(err){
                console.log("There is an err in the Projects model")
                }
                console.log("both items changed");
            });
        });

}


// Delete a project
function deleteProject(req, res){

    let project_id = req.body.project_id;
    sess=req.session;
    client_id = sess.client.rows[0].client_id;
    // Send data to the model
    ProjectsModel.deletePorjectinDB(project_id, function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        result="success";
        res.json(result);
    });
}
// Retrieve information for the Edit-project-Modal content
function projectInfo(req,res){
    let project_id = req.query.project_id;
    ProjectsModel.getSpecificProjectInfo(project_id, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json(result.rows);
    });
}
function projectEdit(req,res){
    let project_id = req.body.project_id;
    let project_name = req.body.project_name;
    let project_description = req.body.project_description;
    if(!(project_id) || !(project_name) || !(project_description)){
        res.json("Please complete all empty fields");
    }
    // Sending data to the model
    ProjectsModel.projectEditinDB(project_id, project_name, project_description, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        res.json("success");
    });
}

module.exports = {
    regProject:regProject,
    regPost:regPost,
    portalView:portalView,
    projectsView:projectsView,
    accountView:accountView,
    deleteProject:deleteProject,
    projectInfo:projectInfo,
    projectEdit:projectEdit,
    postInfo:postInfo,
    editPost:editPost
}; 