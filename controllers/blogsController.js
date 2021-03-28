const BlogsModel = require('../models/blogsModel.js'); 


function blogView(req,res){
    let project_id = req.query.project_id;
    console.log(project_id);
    BlogsModel.getSpecificProjectPosts(project_id, function(err,result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        // Sending data to the client js
        res.json(result.rows);
    });
}


module.exports = {
    blogView:blogView
};