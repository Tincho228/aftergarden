const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});


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

//check existing User
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
    var sql = "SELECT client_id, client_username, client_email, client_password FROM clients WHERE client_username ='"+ client_username +"'";
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
// Check existing Email
function checkExistingEmail(client_email, callback){
    var sql = "SELECT client_email FROM clients WHERE client_email ='"+ client_email +"'";
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
// Update mail
function changeEMailinDB(client_id, client_email,callback){
    var sql = "UPDATE public.clients SET client_email='"+ client_email +"' WHERE client_id = '"+ client_id +"'";
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

// Update password
function changePasswordinDB(client_id, client_password, callback){
    var sql = "UPDATE public.clients SET client_password='"+ client_password +"' WHERE client_id = '"+ client_id +"'";
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
    registerUserinDB:registerUserinDB,
    checkExistingUser:checkExistingUser,
    getClientinfo:getClientinfo,
    checkExistingEmail:checkExistingEmail,
    changeEMailinDB:changeEMailinDB,
    changePasswordinDB:changePasswordinDB
    
}; 