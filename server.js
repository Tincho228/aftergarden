require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


/******* CONTROLLERS ************/
const AccountsController = require('./controllers/accountsController.js');
const ProjectsController = require('./controllers/projectsController.js');
const BlogsController = require('./controllers/blogsController.js');
const CommentsController = require('./controllers/commentsController.js');
const SocialController = require('./controllers/socialController.js');

const path = require('path');
var express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
var app = express();
app.use(require('morgan')('dev'));


//******* SET SESSION **********/
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.use(fileUpload());
app.use(express.urlencoded({extended:true}));
app.use (express.static("public"));
app.use (express.static("pictures"));
app.use (express.static("profile_pictures"));
app.set('view engine', 'ejs');
app.set("port", (process.env.PORT || 5000));


app.get('/', (req, res) => res.render('pages/home')); 
app.post('/register',AccountsController.registerUser);
app.post('/login',AccountsController.login);
app.post('/changeEmail', AccountsController.changeEMail);
app.post('/changePassword', AccountsController.changePassword);
app.post('/profilePicture',AccountsController.profilePicture);

app.get('/myportal', ProjectsController.portalView);
app.get('/account', ProjectsController.accountView);

app.get('/projects', ProjectsController.projectsView);
app.post('/regProject',ProjectsController.regProject);
app.post('/deleteProject', ProjectsController.deleteProject);
app.get('/projectInfo', ProjectsController.projectInfo);
app.post('/projectEdit',ProjectsController.projectEdit);

app.get('/blogView',BlogsController.blogView);
app.post('/postDelete', BlogsController.postDelete);
app.post('/editPost', ProjectsController.editPost);


app.get('/postInfo', ProjectsController.postInfo);
app.post('/regPost', ProjectsController.regPost);


app.post('/makeComment', CommentsController.makeComment);
app.post('/deleteComment', CommentsController.deleteComment);

app.get('/social', SocialController.socialView);
app.get('/socialProject', SocialController.socialProject);
app.get('/socialBlog',SocialController.socialBlog);

/******************************************
********* DESTROY DE SESSION **************
*******************************************/

app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});

app.listen(app.get("port"), function(){
    console.log("Now listening for connection on port: ", app.get("port"));
});

