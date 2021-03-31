// THIS IS THE BLOGS MODEL

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

// Get information about posts of specific project
function getSpecificProjectPosts(project_id, callback){
    var sql = "SELECT * FROM public.posts WHERE project_id = '"+ project_id +"'";
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
// Delete a Post from Database
function postDeleteinDB(post_id, callback){
    var sql = "DELETE FROM public.posts WHERE post_id = '"+ post_id +"'";
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
module.exports = {
    getSpecificProjectPosts:getSpecificProjectPosts,
    postDeleteinDB:postDeleteinDB
}