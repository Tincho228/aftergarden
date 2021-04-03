// require the module Models
const { json } = require('express');
const session = require('express-session');

const CommentsModel = require('../models/commentsModel.js');

function makeComment(req,res){
    let comment_body = req.body.comment_body;
    let project_id = req.body.project_id;
    let sess = req.session;
    let client_id = sess.client.rows[0].client_id;
    if(!(comment_body)){
        return res.json("empty");
    }
    CommentsModel.makeCommentinDB(comment_body,project_id,client_id, function(err, result){
        if(err){
            console.log("An err from Database ocurred");
        }
        res.json("success");
    });
    
}
// Delete a comment
function deleteComment(req,res){
    let comment_id = req.body.comment_id;
    CommentsModel.deleteCommentinDB(comment_id, function(err,result){
        if(err){
            console.log("An err from Database ocurred");
        }
        res.json("success");
    });
}

module.exports = {
    makeComment:makeComment,
    deleteComment:deleteComment
}