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
function getProjectsinfo(client_id, callback){
    var sql = "SELECT * FROM public.projects WHERE client_id = '"+ client_id +"' ";
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
// Delete a project
function deletePorjectinDB(project_id, callback){
    var sql = "DELETE  FROM public.projects WHERE project_id = '"+ project_id +"' ";
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

// Get info from database about a specific project 
function getSpecificProjectInfo(project_id, callback){
    var sql = "SELECT * FROM public.projects WHERE project_id = '"+ project_id +"'";
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

// Update project information
function projectEditinDB(project_id, project_name, project_description, callback){
    var sql = "UPDATE public.projects SET project_name='"+ project_name +"',project_description ='"+ project_description +"' WHERE project_id = '"+ project_id +"'";
    pool.query(sql,function(err, result){
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}

// Get specific Post info from DB
function getSpecificPostInfo(post_id, callback){
    var sql = "SELECT * FROM posts WHERE post_id = '"+ post_id +"'";
    pool.query(sql,function(err, result){
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
    regPostinDB:regPostinDB,
    getProjectsinfo:getProjectsinfo,
    deletePorjectinDB:deletePorjectinDB,
    getSpecificProjectInfo:getSpecificProjectInfo,
    projectEditinDB:projectEditinDB,
    getSpecificPostInfo:getSpecificPostInfo
    
}; 