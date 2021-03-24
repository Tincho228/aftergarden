// THIS IS THE PROJECTS MODEL

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

// Register a new project

function regProjectinDB(project_name, project_description,client_id, callback){
    var sql = "INSERT into public.projects (project_name, project_description, client_id) values ('"+project_name+"','"+project_description+"','"+client_id+"')";
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
// Register a new post i
function regPostinDB(post_description, post_image_path, project_id, callback){
    
    var sql = "INSERT into public.posts (post_description, post_image_path, project_id) values ('"+ post_description +"','"+ post_image_path +"','"+ project_id +"')";
    
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

// Get project info by client_id



module.exports = {
    regProjectinDB:regProjectinDB,
    regPostinDB:regPostinDB
    
}; 