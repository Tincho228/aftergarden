
// require the module Models
const { json } = require('express');
const session = require('express-session');

// Social View

function socialView(req,res){
    var sess=req.session;
    params = sess.client.rows;
    res.render('pages/social', params);
}



module.exports = {
    socialView:socialView
}