require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/******* CONTROLLERS ************/
const AccountsController = require('./controllers/accountsController.js');
const ProjectsController = require('./controllers/projectsController.js');

const path = require('path');
var express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
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

app.use(express.urlencoded({extended:true}));
app.use (express.static("public"));
app.set('view engine', 'ejs');
app.set("port", (process.env.PORT || 5000));


app.get('/', (req, res) => res.render('pages/home')); 
app.post('/register',AccountsController.registerUser);
app.post('/login',AccountsController.login);
app.get('/myportal',(req,res) => res.render('pages/myportal'));

app.post('/regProject',ProjectsController.regProject);

app.listen(app.get("port"), function(){
    console.log("Now listening for connection on port: ", app.get("port"));
});

function getPerson(req, res){
    console.log("Getting person information");
    var id = req.query.id;
    console.log("Retrieving person with id", id);

    getUserFromDb(id, function(error, result){
        console.log("Back from the database with result: ", result);
        res.json(result);
    });
}

function getUserFromDb(id, callback){
    console.log("Get person from Db called with id: ",id);

    var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users WHERE user_id =$1::int";
    var params = [id];
    pool.query(sql, params, function(err, result){
        if(err){
            console.log("An error with the DB ocurred");
            console.log(err);
            callback(err, null);
        }
        console.log("Found the result:" + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}