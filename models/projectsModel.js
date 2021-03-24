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
// Register a new image i
function regImageinDB(image_name, image_path, callback){
    console.log(image_data);
    var sql = "SELECT image_data from public.images (image_name, image_data) values ('"+image_name+"','"+image_path+"')";
    
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
    regProjectinDB:regProjectinDB,
    regImageinDB:regImageinDB
    
}; 