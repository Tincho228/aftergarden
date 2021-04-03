// THIS IS THE PROJECTS MODEL

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

// Get the comment information by client

function getClients(callback){
    var sql = "SELECT * FROM public.clients";
    pool.query(sql,function(err, result){
        console.log("querying DB");
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    })
}

module.exports = {
    getClients:getClients
}

