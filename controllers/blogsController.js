const BlogsModel = require('../models/blogsModel.js'); 
const CommentsModel = require('../models/commentsModel.js');
const ProjectsModel = require('../models/projectsModel.js');




function blogView(req,res){
    let project_id = req.query.project_id;
    let sess = req.session;
    params = sess.client.rows;
    BlogsModel.getSpecificProjectPosts(project_id, function(err,result){
        if(err){
            console.log("There is an err from de Blogs model");
        }
        // Sending data to the client js
        let blog_info = result.rows;
        console.log("The project_id is: "+ project_id);
        ProjectsModel.getSpecificProjectInfo(project_id, function(err,result){
            if(err){
                console.log("There is an err from the Projects model")
            }
            let info = result.rows;    
            CommentsModel.getSpecificComments(project_id, function(err, result){
                if(err){
                    console.log("There is an err from the Blogs model")
                }
                let comment_info = result.rows;
                data = {
                    params:params,
                    blog_info:blog_info,
                    info:info,
                    comment_info:comment_info
                }
                console.log(comment_info);
                res.render('pages/blog',data);
            });
        });
    });
}
// Delete a Post
function postDelete(req, res){
    let post_id = req.body.post_id;
    BlogsModel.postDeleteinDB(post_id, function(err, result){
        if(err){
            console.log("There is an err from the Blogs Model");
        }
        result = "success";
        res.json(result);
    });
}

module.exports = {
    blogView:blogView,
    postDelete:postDelete
};