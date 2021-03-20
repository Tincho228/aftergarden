const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

function getusersFromDB(id,callback){
    // establishing params for sql
   var params = [id];
   // create slq statement
   //var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users";
   var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users WHERE user_id =$1::int";
   // sending query to DB
   pool.query(sql, params, function(err, result){
       console.log("querying DB...")
       if(err){
           console.log("An error with the DB ocurred");
           console.log(err);
           callback(err, null);
       }
       callback(null, result);
   });   
}
function registerUserinDB(client_username, client_email, client_password, callback){
    var params = [client_username, client_email, client_password];
    
    var sql = "INSERT into public.clients(client_username, client_email, client_password) values ('"+client_username+"','"+client_email+"','"+client_password+"')";
    pool.query(sql,function(err, result){
        console.log("querying DB");
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}

//check existing email
function checkExistingUser(client_username, callback) {
    console.log("We are checking existing user in DB" + client_username);
    var sql = "SELECT client_username FROM clients WHERE client_username ='"+ client_username +"'";
    pool.query(sql,function(err, result){
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}
// get client info

function getClientinfo(client_username, callback){
    console.log("Retrieving client information with user " + client_username);
    var sql = "SELECT client_username, client_email, client_password FROM clients WHERE client_username ='"+ client_username +"'";
    pool.query(sql,function(err, result){
        console.log(" we are querying DB for check email");
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}










module.exports = {
    getusersFromDB: getusersFromDB,
    registerUserinDB:registerUserinDB,
    checkExistingUser:checkExistingUser,
    getClientinfo:getClientinfo
    
}; 