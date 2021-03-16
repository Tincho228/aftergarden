require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require("express");
const path = require('path');
var app = express();

//Set public folder
app.use (express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

app.set("port", (process.env.PORT || 5000));

// Index Page
app.get('/', (req, res) => res.render('pages/home')) 

app.get("/users", getPerson) // Returns a Json File

app.post("/json", function(req, res){
    console.log("sending data to ajax");
    
    /*var params = [id];
    var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users WHERE user_id =$1::int";
    pool.query(sql, params, function(err, result){
        if(err){
            console.log("An error with the DB ocurred");
            console.log(err);
            callback(err, null);
        }
        console.log("Found the result:" + JSON.stringify(result.rows));
        res.status(200).json(result.rows);    
    });*/
    var result = "This is information from the database";
    res.status(200).json(result);
    });

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