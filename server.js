require('dotenv').config();
var express = require("express");
var app = express();
const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://familyhistoryuser:elijah@localhost:5432/familyhistory";
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

app.set("port", (process.env.PORT || 5000));

app.get("/getPerson", getPerson)

app.listen(app.get("port"), function(){
    console.log("Now listening for connection on port: ", app.get("port"));
});

function getPerson(req, res){
    console.log("Getting person information");
    var id = req.query.id;
    console.log("Retrieving person with id", id);

    getPersonFromDb(id, function(error, result){
        console.log("Back from the database with result: ", result);
        res.json(result);
    });
}

function getPersonFromDb(id, callback){
    console.log("Get person from Db called with id: ",id);

    var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users WHERE id =$1::int";
    var params = [id];
    pool.query(sql, params, function(err, result){
        if(err){
            console.log("An error with the DB ocurred");
            console.log(err);
            callback(err, null);
        }
        console.log("Found the result:" + JSON.stringify(result.rows));
        callback(null, result.rows);
    })
}