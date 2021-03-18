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














module.exports = {
    getusersFromDB: getusersFromDB
}; 