require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/******* CONTROLLERS ************/
const AccountsController = require('./controllers/accountsController.js');
const ProjectsController = require('./controllers/projectsController.js');

const path = require('path');
var express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
const projectsController = require('./controllers/projectsController.js');
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
app.set('view engine', 'ejs');
app.set("port", (process.env.PORT || 5000));


app.get('/', (req, res) => res.render('pages/home')); 
app.post('/register',AccountsController.registerUser);
app.post('/login',AccountsController.login);

app.get('/myportal', ProjectsController.portalView);
app.get('/account', ProjectsController.accountView);

app.post('/regProject',ProjectsController.regProject);


app.post('/regPost', ProjectsController.regPost);

app.listen(app.get("port"), function(){
    console.log("Now listening for connection on port: ", app.get("port"));
});

