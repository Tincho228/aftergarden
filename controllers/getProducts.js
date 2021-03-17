const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';

const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

function getProducts(req,res){
    var id = req.body.id;
    var params = [id];
    console.log(id);
    var sql = "SELECT user_id, user_name, user_email, user_password FROM public.users WHERE user_id =$1::int";
    pool.query(sql, params, function(err, db_result){
        if(err){
            console.log("An error with the DB ocurred");
            console.log(err);
        }else{
            console.log("Found the result:" + JSON.stringify(db_result.rows));
            var results = {
                list:db_results.rows
            };
            callback(null, results);
        }
        
    });
    /*var result = "This is information from the database";
    res.status(200).json(result);*/
}
module.exports = {
    getProducts: getProducts
};