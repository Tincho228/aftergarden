
// require the module Models
const { json } = require('express');
const session = require('express-session');
const ProjectsModel = require('../models/projectsModel.js');
const SocialModel = require('../models/socialModel.js');
const BlogsModel = require('../models/blogsModel.js');
const CommentsModel = require('../models/commentsModel');



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
    let sess = req.session;
    let params = sess.client.rows;
    let client_id = req.query.client_id;
    ProjectsModel.getProjectsinfo(client_id, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        let info = result.rows
        data = {
            params:params,
            info:info
        }
        res.render('pages/socialProjects', data);
    });
}
// Social Blog
function socialBlog(req,res){
    let project_id = req.query.project_id;
    let sess = req.session;
    let params = sess.client.rows;
    BlogsModel.getSpecificProjectPosts(project_id, function(err,result){
        if(err){
            console.log("There is an err from de Blogs model");
        }
        // Sending data to the client js
        let blog_info = result.rows;
        ProjectsModel.getSpecificProjectInfo(project_id, function(err,result){
            if(err){
                console.log("There is an err from the Projects model")
            }
            let info = result.rows;    
            CommentsModel.getSpecificComments(project_id, function(err, result){
                if(err){
                    console.log("There is an err from the Blogs model")
                }
                let comment_count = result.rowCount;
                let comment_info = result.rows;
                data = {
                    params:params,
                    blog_info:blog_info,
                    info:info,
                    comment_info:comment_info,
                    comment_count:comment_count
                }
                return res.render('pages/socialBlog', data);
            });
        });
    });
}

module.exports = {
    socialView:socialView,
    socialProject:socialProject,
    socialBlog:socialBlog
}